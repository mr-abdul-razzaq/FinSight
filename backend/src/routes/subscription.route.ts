import { Router } from "express";
import {
  getSubscription,
  createCheckoutSession,
  createBillingPortal,
} from "../controllers/subscription.controller";

const subscriptionRoutes = Router();

subscriptionRoutes.get("/", getSubscription);
subscriptionRoutes.post("/checkout", createCheckoutSession);
subscriptionRoutes.post("/billing-portal", createBillingPortal);

export default subscriptionRoutes;
