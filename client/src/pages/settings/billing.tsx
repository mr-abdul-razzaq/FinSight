import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useGetSubscriptionQuery, useCreateCheckoutSessionMutation, useCreateBillingPortalMutation } from "@/features/subscription/subscriptionAPI";
import { Loader2, CheckCircle2, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "FREE",
    description: "Essential tools for personal finance management.",
    price: "₹0",
    features: ["5 AI Receipt Scans / mo", "1 AI Report / mo", "Basic Dashboard", "Standard Support"],
    popular: false,
  },
  {
    name: "PRO",
    description: "Advanced analytics and higher limits for power users.",
    price: "₹999/mo",
    features: ["50 AI Receipt Scans / mo", "10 AI Reports / mo", "Advanced Dashboard", "Priority Support"],
    popular: true,
  },
  {
    name: "BUSINESS",
    description: "Unlimited capabilities for business and professional use.",
    price: "₹1999/mo",
    features: ["Unlimited AI Receipt Scans", "Unlimited AI Reports", "Custom Categories", "24/7 Dedicated Support"],
    popular: false,
  },
];

const Billing = () => {
  const { data, isLoading } = useGetSubscriptionQuery();
  const [createCheckout, { isLoading: isCheckoutLoading }] = useCreateCheckoutSessionMutation();
  const [createPortal, { isLoading: isPortalLoading }] = useCreateBillingPortalMutation();

  const subscription = data?.data;
  const currentPlan = subscription?.plan || "FREE";

  const handleSubscribe = async (plan: "PRO" | "BUSINESS") => {
    try {
      const res = await createCheckout({ plan }).unwrap();
      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleManageBilling = async () => {
    try {
      const res = await createPortal().unwrap();
      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-semibold tracking-tight">Billing & Subscription</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your plan, billing details, and view your usage limits.
        </p>
      </div>
      <Separator />

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between p-6 bg-muted/50 rounded-lg border border-border/50">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Current Plan</h4>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-2xl font-bold tracking-tight">{currentPlan}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                Active
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              You are currently using {subscription?.usageCount?.receiptScans || 0} receipt scans and {subscription?.usageCount?.aiReports || 0} AI reports this billing cycle.
            </p>
          </div>
          {currentPlan !== "FREE" && (
            <Button onClick={handleManageBilling} disabled={isPortalLoading} variant="outline" className="shadow-sm">
              {isPortalLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Manage Billing
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {plans.map((plan, index) => (
            <motion.div 
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card className={cn(
                "relative flex flex-col h-full border-border/50 shadow-sm transition-all hover:shadow-md",
                plan.popular && "border-primary shadow-[0_0_20px_rgba(var(--primary),0.1)]",
                currentPlan === plan.name && "bg-muted/30"
              )}>
                {plan.popular && (
                  <div className="absolute top-0 right-6 transform -translate-y-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                      <Zap className="size-3" /> Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription className="min-h-[40px]">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">{plan.price}</span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  {currentPlan === plan.name ? (
                    <Button variant="outline" className="w-full bg-muted/50 text-muted-foreground cursor-default hover:bg-muted/50 hover:text-muted-foreground">
                      Current Plan
                    </Button>
                  ) : (
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? "default" : "outline"}
                      onClick={() => handleSubscribe(plan.name as "PRO" | "BUSINESS")}
                      disabled={isCheckoutLoading || (currentPlan === "BUSINESS" && plan.name === "PRO")}
                    >
                      {isCheckoutLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      {currentPlan === "FREE" ? "Upgrade" : "Switch Plan"}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Billing;
