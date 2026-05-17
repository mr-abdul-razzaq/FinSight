import { motion } from "framer-motion";
import { CheckCircle2, FileText, BarChart2 } from "lucide-react";

const Showcase = () => {
  return (
    <section className="py-24 overflow-hidden bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8 animate-fade-in"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              A command center for your entire financial life
            </h2>
            <p className="text-lg text-muted-foreground">
              FinSight brings everything together. From automated receipt parsing to dynamic category tracking, get a bird's-eye view of your finances without the manual spreadsheets.
            </p>

            <ul className="space-y-4 pt-4">
              {[
                "Beautiful, interactive charts and tables",
                "Advanced AI receipt extraction and categorization",
                "Automated end-of-month summary reports",
                "One-click CSV import and export"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Premium CSS-Only Features Bento Grid Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full -z-10"></div>

            {/* Block 1: Expense breakdown simulation */}
            <div className="rounded-2xl border border-border/50 bg-background/70 p-5 shadow-xl backdrop-blur-sm space-y-4 hover:border-primary/20 transition-all duration-300">
              <div className="flex items-center justify-between pb-2 border-b border-border/40">
                <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <BarChart2 className="w-4 h-4 text-primary" />
                  Monthly Analytics
                </span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-500 font-bold px-1.5 py-0.5 rounded">Parsed</span>
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-muted-foreground">Office Supplies</span>
                    <span className="text-foreground">45%</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[45%]" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-muted-foreground">SaaS Tools</span>
                    <span className="text-foreground">35%</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[35%]" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-muted-foreground">Marketing</span>
                    <span className="text-foreground">20%</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <div className="bg-violet-500 h-full w-[20%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Block 2: Multimodal Receipt Scanning Simulation */}
            <div className="rounded-2xl border border-border/50 bg-background/70 p-5 shadow-xl backdrop-blur-sm space-y-4 hover:border-primary/20 transition-all duration-300">
              <div className="flex items-center justify-between pb-2 border-b border-border/40">
                <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-primary" />
                  Multimodal Scan
                </span>
                <span className="text-[9px] bg-primary/10 text-primary font-bold px-1.5 py-0.5 rounded">Gemini OCR</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-border/30">
                  <span className="text-muted-foreground">Merchant</span>
                  <span className="font-semibold text-foreground">Amazon India</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-border/30">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-semibold text-foreground">Equipment</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-border/30">
                  <span className="text-muted-foreground">Total Paid</span>
                  <span className="font-semibold text-foreground">₹2,450.00</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-muted-foreground">Confidence</span>
                  <span className="font-semibold text-emerald-500">99.8%</span>
                </div>
              </div>
            </div>

            {/* Block 3: Animated floating statistics simulator */}
            <div className="rounded-2xl border border-border/50 bg-background/70 p-5 shadow-xl backdrop-blur-sm flex items-center gap-4 hover:border-primary/20 transition-all duration-300 md:col-span-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-xl font-bold shrink-0">
                +
              </div>
              <div className="flex-1">
                <span className="text-xs text-muted-foreground font-semibold">Total Savings Generated</span>
                <h4 className="text-xl font-extrabold text-foreground font-outfit mt-0.5">₹34,250.00</h4>
              </div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full shrink-0">
                Verified
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
