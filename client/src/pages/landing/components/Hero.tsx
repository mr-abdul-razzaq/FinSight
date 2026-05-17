import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AUTH_ROUTES } from "@/routes/common/routePath";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 opacity-50 dark:opacity-30"></div>

      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>AI-Powered Financial Command Center</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
            Smarter finances, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              automated insights.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Track expenses, automate your monthly reports, and grow smarter financially with FinSight's advanced AI capabilities. Built for the modern user.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to={AUTH_ROUTES.SIGN_UP}>
              <Button size="lg" className="rounded-full h-12 px-8 text-base shadow-lg shadow-primary/25 group">
                Get Started Free
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to={AUTH_ROUTES.SIGN_IN}>
              <Button size="lg" variant="outline" className="rounded-full h-12 px-8 text-base">
                Sign In
              </Button>
            </Link>
          </div>
        </motion.div>


      </div>
    </section>
  );
};

export default Hero;
