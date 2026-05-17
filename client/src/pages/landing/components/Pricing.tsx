import { motion } from "framer-motion";
import { CheckCircle2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AUTH_ROUTES } from "@/routes/common/routePath";
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
    price: "₹999",
    period: "/mo",
    features: ["50 AI Receipt Scans / mo", "10 AI Reports / mo", "Advanced Dashboard", "Priority Support"],
    popular: true,
  },
  {
    name: "BUSINESS",
    description: "Unlimited capabilities for professional use.",
    price: "₹1999",
    period: "/mo",
    features: ["Unlimited AI Receipt Scans", "Unlimited AI Reports", "Custom Categories", "24/7 Dedicated Support"],
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Simple, transparent pricing</h2>
          <p className="text-muted-foreground text-lg">
            Start for free, upgrade when you need more power.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={cn(
                "relative flex flex-col p-8 rounded-3xl border transition-all duration-300 hover:shadow-xl bg-background",
                plan.popular 
                  ? "border-primary shadow-[0_0_30px_rgba(var(--primary),0.15)] md:-mt-4 md:mb-4" 
                  : "border-border/50 hover:border-border"
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 right-8 transform -translate-y-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                    <Zap className="size-3.5" /> Popular Choice
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm min-h-[40px]">{plan.description}</p>
              </div>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground font-medium">{plan.period}</span>}
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/80 font-medium">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to={AUTH_ROUTES.SIGN_UP} className="mt-auto">
                <Button 
                  className="w-full rounded-full h-12 text-base" 
                  variant={plan.popular ? "default" : "outline"}
                >
                  Get Started
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
