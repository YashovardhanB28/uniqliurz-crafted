import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
};

export interface Testimonial {
  quote: string;
  name: string;
  location: string;
  product?: string;
  source: "instagram" | "whatsapp" | "google";
  sourceUrl?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    quote: "Absolutely in love with the custom resin clock! The attention to detail is incredible and it looks even better in person. Best gift I've ever ordered.",
    name: "Sarah M.",
    location: "New Jersey",
    product: "Custom Resin Clock",
    source: "instagram",
  },
  {
    quote: "Ordered engraved keepsakes for my wedding party and everyone was blown away. The quality exceeded my expectations. Will definitely order again.",
    name: "Jessica T.",
    location: "New York",
    product: "Engraved Keepsakes",
    source: "whatsapp",
  },
  {
    quote: "Working with Uniqliurz was seamless from start to finish. They took my vague idea and turned it into a beautiful piece of art. Highly recommend.",
    name: "Michael R.",
    location: "California",
    product: "Custom Resin Art",
    source: "google",
  },
];

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

function TestimonialsSection({ testimonials = defaultTestimonials }: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 border-t border-border">
      <div className="container mx-auto px-4">
        <motion.div {...fadeUp} className="text-center mb-16">
          <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground mb-4">
            What our customers say
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-[0.14em] uppercase text-foreground">
            Real Reviews from<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26522] to-[#FF7A2F]">Real People</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative rounded-xl border border-border bg-card p-6 flex flex-col"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, s) => (
                  <svg key={s} className="w-4 h-4 fill-[#F26522]" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-sm text-foreground/80 leading-relaxed mb-6 flex-1">
                "{t.quote}"
              </p>

              {t.product && (
                <p className="text-[10px] tracking-[0.2em] uppercase text-primary mb-3">
                  {t.product}
                </p>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
                {t.source === "instagram" && (
                  <a
                    href={t.sourceUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    title="View on Instagram"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="5" />
                      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                    </svg>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { TestimonialsSection };
export default TestimonialsSection;
