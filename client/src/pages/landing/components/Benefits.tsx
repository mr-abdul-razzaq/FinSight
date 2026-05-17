import { motion } from "framer-motion";
import { TrendingUp, Clock, Zap, Target } from "lucide-react";

const Benefits = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Why choose FinSight?</h2>
          <p className="text-muted-foreground text-lg">
            Experience a new standard of financial tracking that saves you time and increases your net worth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto auto-rows-[240px]">
          {/* Large Item */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 md:row-span-2 rounded-3xl bg-gradient-to-br from-primary/20 via-primary/5 to-background border border-border/50 p-8 flex flex-col relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
              <TrendingUp className="w-32 h-32 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4 relative z-10">Grow your wealth</h3>
            <p className="text-muted-foreground text-lg mb-8 relative z-10 max-w-sm">
              Our AI doesn't just show you numbers. It understands your habits and gives actionable advice to increase your savings rate.
            </p>
            <div className="mt-auto relative z-10">
              <div className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50 text-sm font-medium">
                +24% Average Savings Increase
              </div>
            </div>
          </motion.div>

          {/* Medium Item 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 rounded-3xl bg-muted/40 border border-border/50 p-8 flex flex-col justify-center"
          >
            <Clock className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Save 5 hours a week</h3>
            <p className="text-muted-foreground">
              Stop manually entering receipts. Just snap a picture and let our AI do the data entry and categorization instantly.
            </p>
          </motion.div>

          {/* Small Item 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-3xl bg-muted/40 border border-border/50 p-8 flex flex-col items-center text-center justify-center hover:bg-primary/5 transition-colors"
          >
            <Zap className="w-8 h-8 text-amber-500 mb-4" />
            <h3 className="font-bold mb-2">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">Real-time data syncing</p>
          </motion.div>

          {/* Small Item 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-3xl bg-muted/40 border border-border/50 p-8 flex flex-col items-center text-center justify-center hover:bg-primary/5 transition-colors"
          >
            <Target className="w-8 h-8 text-emerald-500 mb-4" />
            <h3 className="font-bold mb-2">Hit Goals</h3>
            <p className="text-sm text-muted-foreground">Stay on budget easily</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
