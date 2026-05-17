import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middlerware";
import { HTTPSTATUS } from "../config/http.config";
import {
  getSubscriptionService,
  createCheckoutSessionService,
  createBillingPortalService,
  handleRazorpayWebhookService,
} from "../services/subscription.service";

export const getSubscription = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    if (!userId) throw new Error("User not found");

    const subscription = await getSubscriptionService(userId);
    return res.status(HTTPSTATUS.OK).json({
      message: "Subscription retrieved successfully",
      data: subscription,
    });
  }
);

export const createCheckoutSession = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    if (!userId) throw new Error("User not found");
    const { plan } = req.body;

    const { url } = await createCheckoutSessionService(userId, plan);
    return res.status(HTTPSTATUS.OK).json({
      message: "Checkout session created",
      data: { url },
    });
  }
);

export const createBillingPortal = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    if (!userId) throw new Error("User not found");

    const { url } = await createBillingPortalService(userId);
    return res.status(HTTPSTATUS.OK).json({
      message: "Billing portal created",
      data: { url },
    });
  }
);

export const razorpayWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["x-razorpay-signature"] as string;

  try {
    const bodyString = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : JSON.stringify(req.body);
    const bodyJson = typeof req.body === 'string' || Buffer.isBuffer(req.body) ? JSON.parse(bodyString) : req.body;

    await handleRazorpayWebhookService(bodyJson, bodyString, sig);
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  res.json({ received: true });
};
