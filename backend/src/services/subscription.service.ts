import { razorpay, PLANS, RAZORPAY_WEBHOOK_SECRET } from "../config/razorpay.config";
import SubscriptionModel from "../models/subscription.model";
import UserModel from "../models/user.model";
import { BadRequestException, NotFoundException } from "../utils/app-error";
import { Env } from "../config/env.config";
import crypto from "crypto";

export const getSubscriptionService = async (userId: string) => {
  let subscription = await SubscriptionModel.findOne({ userId });

  if (!subscription) {
    const user = await UserModel.findById(userId);
    if (!user) throw new NotFoundException("User not found");

    // Razorpay Customer Creation
    const customer = await razorpay.customers.create({
      email: user.email,
      name: user.name,
      notes: {
        userId: String(user._id),
      },
    });

    subscription = await SubscriptionModel.create({
      userId,
      razorpayCustomerId: customer.id,
      plan: "FREE",
      status: "active",
      cancelAtPeriodEnd: false,
      usageCount: {
        receiptScans: 0,
        aiReports: 0,
      },
    });
  }

  return subscription;
};

export const createCheckoutSessionService = async (userId: string, plan: "PRO" | "BUSINESS") => {
  const subscription = await getSubscriptionService(userId);
  const planId = PLANS[plan];

  if (!planId || planId === "FREE") {
    throw new BadRequestException("Invalid plan selected");
  }

  // Create Razorpay Subscription
  const rzpSubscription = await razorpay.subscriptions.create({
    plan_id: planId,
    customer_notify: 1,
    total_count: 120, // High number for recurring
    notes: {
      userId,
      plan,
    },
  });

  return { url: rzpSubscription.short_url };
};

export const createBillingPortalService = async (userId: string) => {
  const subscription = await getSubscriptionService(userId);

  if (!subscription.razorpaySubscriptionId) {
    throw new BadRequestException("No active Razorpay subscription found");
  }

  // Fetch the subscription to get the hosted management link
  const rzpSubscription = await razorpay.subscriptions.fetch(subscription.razorpaySubscriptionId);

  return { url: rzpSubscription.short_url };
};

export const handleRazorpayWebhookService = async (body: any, bodyString: string, signature: string) => {
  const expectedSignature = crypto
    .createHmac("sha256", RAZORPAY_WEBHOOK_SECRET)
    .update(bodyString)
    .digest("hex");

  if (expectedSignature !== signature) {
    throw new BadRequestException("Invalid webhook signature");
  }

  const event = body.event;
  const payload = body.payload;

  switch (event) {
    case "subscription.authenticated":
    case "subscription.activated":
    case "subscription.charged":
      const subscriptionId = payload.subscription.entity.id;
      const notes = payload.subscription.entity.notes;
      const userId = notes?.userId;
      const plan = notes?.plan as "PRO" | "BUSINESS";

      if (userId && plan) {
        await SubscriptionModel.findOneAndUpdate(
          { userId },
          {
            razorpaySubscriptionId: subscriptionId,
            plan,
            status: "active",
            currentPeriodStart: new Date(payload.subscription.entity.current_start * 1000),
            currentPeriodEnd: new Date(payload.subscription.entity.current_end * 1000),
          }
        );
      }
      break;

    case "subscription.updated":
      const updatedSub = payload.subscription.entity;
      await SubscriptionModel.findOneAndUpdate(
        { razorpaySubscriptionId: updatedSub.id },
        {
          status: updatedSub.status,
          currentPeriodStart: new Date(updatedSub.current_start * 1000),
          currentPeriodEnd: new Date(updatedSub.current_end * 1000),
          cancelAtPeriodEnd: updatedSub.cancel_at_period_end === 1,
        }
      );
      break;

    case "subscription.cancelled":
    case "subscription.completed":
      const cancelledSub = payload.subscription.entity;
      await SubscriptionModel.findOneAndUpdate(
        { razorpaySubscriptionId: cancelledSub.id },
        {
          status: "cancelled",
          plan: "FREE",
          razorpaySubscriptionId: null,
          razorpayPlanId: null,
          cancelAtPeriodEnd: false,
        }
      );
      break;
  }
};
