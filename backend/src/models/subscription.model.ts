import mongoose, { Document, Schema } from "mongoose";

export interface SubscriptionDocument extends Document {
  userId: mongoose.Types.ObjectId;
  razorpayCustomerId?: string;
  razorpaySubscriptionId?: string;
  razorpayPlanId?: string;
  plan: "FREE" | "PRO" | "BUSINESS";
  status: "active" | "cancelled" | "past_due" | "created" | "pending" | "halted" | "completed" | "expired";
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd: boolean;
  usageCount: {
    receiptScans: number;
    aiReports: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const subscriptionSchema = new Schema<SubscriptionDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    razorpayCustomerId: {
      type: String,
      sparse: true,
      unique: true,
    },
    razorpaySubscriptionId: {
      type: String,
      sparse: true,
    },
    razorpayPlanId: {
      type: String,
    },
    plan: {
      type: String,
      enum: ["FREE", "PRO", "BUSINESS"],
      default: "FREE",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "past_due", "created", "pending", "halted", "completed", "expired"],
      default: "active",
      required: true,
    },
    currentPeriodStart: {
      type: Date,
    },
    currentPeriodEnd: {
      type: Date,
    },
    cancelAtPeriodEnd: {
      type: Boolean,
      default: false,
    },
    usageCount: {
      receiptScans: {
        type: Number,
        default: 0,
      },
      aiReports: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

const SubscriptionModel = mongoose.model<SubscriptionDocument>("Subscription", subscriptionSchema);
export default SubscriptionModel;
