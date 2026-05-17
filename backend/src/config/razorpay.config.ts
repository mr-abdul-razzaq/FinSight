import Razorpay from "razorpay";
import { Env } from "./env.config";

export const razorpay = new Razorpay({
  key_id: Env.RAZORPAY_KEY_ID as string,
  key_secret: Env.RAZORPAY_KEY_SECRET as string,
});

export const RAZORPAY_WEBHOOK_SECRET = Env.RAZORPAY_WEBHOOK_SECRET;

// Plan mapping for Free/Pro/Business
export const PLANS = {
  FREE: "FREE",
  PRO: Env.RAZORPAY_PRO_PLAN_ID,
  BUSINESS: Env.RAZORPAY_BUSINESS_PLAN_ID,
};
