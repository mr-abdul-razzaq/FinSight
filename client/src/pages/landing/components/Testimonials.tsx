import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "FinSight completely changed how I manage my personal finances. The AI receipt scanner alone saves me hours every month.",
    author: "Sarah J.",
    role: "Freelance Designer",
  },
  {
    quote: "The monthly AI insights are incredible. It feels like having a personal financial advisor analyzing my spending habits.",
    author: "Michael T.",
    role: "Software Engineer",
  },
  {
    quote: "Cleanest, most intuitive financial dashboard I've used. I migrated from Mint and haven't looked back since.",
    author: "Elena R.",
    role: "Marketing Director",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Loved by people who love their money</h2>
          <p className="text-muted-foreground text-lg">
            See what our users are saying about FinSight.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-muted/30 border border-border/50 relative"
            >
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-foreground text-lg leading-relaxed mb-6 font-medium">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="font-bold">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
