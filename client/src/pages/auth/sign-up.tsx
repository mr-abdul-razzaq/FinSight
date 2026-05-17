import SignUpForm from "./_component/signup-form";
import Logo from "@/components/logo/logo";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, BrainCircuit, Activity } from "lucide-react";

const SignUp = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col gap-4 p-6 md:p-10 md:pt-6 animate-fade-in"
      >
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo url="/" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignUpForm />
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative hidden bg-gradient-to-br from-muted/30 via-background to-primary/5 lg:block border-l border-border/40 overflow-hidden"
      >
        {/* Soft glowing ambient circles */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-[90px] -z-10"></div>

        <div className="absolute inset-0 flex flex-col justify-between p-12 lg:p-16">
          <div className="space-y-6 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Next-Gen Financial Command Center</span>
            </div>

            <h2 className="text-4xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Smarter money management,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                driven by advanced AI.
              </span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Consolidate expenses, parse multimodal receipts, and receive automated financial summaries. Elevate your savings with FinSight's cognitive reporting pipelines.
            </p>
          </div>

          {/* SaaS-Style Metric Block Showcase */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="grid grid-cols-1 gap-6 w-full max-w-2xl mt-8"
          >
            {/* Card 1: Sparkline & Metrics */}
            <div className="rounded-2xl border border-border/50 bg-background/60 p-6 shadow-xl backdrop-blur-xl hover:border-primary/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Net Balance Growth</span>
                    <h4 className="text-2xl font-bold text-foreground font-outfit">₹14,840.50</h4>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500">
                  <TrendingUp className="w-3 h-3" />
                  +12.4%
                </span>
              </div>
              {/* Clean Vector SVG Sparkline representing positive visual trend */}
              <svg viewBox="0 0 300 40" className="w-full h-10 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M 0 32 Q 30 20 60 28 T 120 12 T 180 24 T 240 8 T 300 4" />
              </svg>
            </div>

            {/* Card 2: AI Cognitive Insights */}
            <div className="rounded-2xl border border-border/50 bg-background/60 p-6 shadow-xl backdrop-blur-xl hover:border-primary/20 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Gemini Cognitive Assistant</h4>
                  <p className="text-xs text-muted-foreground">Automated Insight • Real-time</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                "We analyzed your recurring subscriptions and found overlapping services. Cancelling the unused secondary license will automatically increase your annual cash surplus by <span className="font-semibold text-foreground font-outfit">₹480.00</span>."
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;