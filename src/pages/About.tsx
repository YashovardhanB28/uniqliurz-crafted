import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Shield } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
};

const trustItems = [
  'Uniqliurz LLC is a registered single-member LLC based in New Jersey, USA.',
  'Secure payment processing through Shopify checkout, trusted by millions.',
  'Clear proposals and documentation suitable for internal approvals and budgets.',
  'A defined process that outlines every key decision before production begins with no surprises.',
  'Thoughtful packaging and presentation so gifts feel ready the moment they arrive.',
  'Nationwide shipping across the United States. We handle the logistics.',
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-36 pb-20">
        <div className="container mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.24em] uppercase text-muted-foreground mb-5"
          >
            About Uniqliurz
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[0.16em] uppercase text-foreground"
          >
            A Studio Built Around<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26522] to-[#FF7A2F]">Meaningful Design</span>
          </motion.h1>
        </div>
      </section>

      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div {...fadeUp}>
              <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground mb-4">Our Story</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[0.14em] uppercase text-foreground">
                Every Creation Begins<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26522] to-[#FF7A2F]">With Intention</span>
              </h2>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
              <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-6">
                At Uniqliurz, every creation begins with intention. We transform life's milestones and business moments into refined, personalized keepsakes crafted with care.
              </p>
              <p className="text-base md:text-lg text-foreground/70 leading-relaxed mb-6">
                From private celebrations to corporate partnerships, our work blends aesthetic detail with emotional relevance so gifts feel considered, not generic.
              </p>
              <p className="text-base md:text-lg text-foreground/70 leading-relaxed mb-6">
                What sets us apart is our commitment to collaboration. We do not just make products. We partner with you to bring your vision to life, ensuring every gift is as unique as the story behind it.
              </p>
              <p className="text-base md:text-lg text-foreground/80 leading-relaxed font-medium">
                Based in New Jersey, we ship across the United States. Every piece is made to order and no two creations are ever the same.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-border bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div {...fadeUp} className="rounded-xl border border-border bg-card p-8">
              <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground mb-4">Our Mission</p>
              <p className="text-foreground/80 leading-relaxed">
                To transform life's most meaningful moments into tangible, lasting keepsakes. We blend craftsmanship with genuine care to create gifts that resonate for individuals marking milestones and for organizations building culture.
              </p>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="rounded-xl border border-border bg-card p-8">
              <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground mb-4">Our Vision</p>
              <p className="text-foreground/80 leading-relaxed">
                To be the most trusted partner for thoughtfully crafted gifts across the United States, where every creation tells a story and every client feels genuinely understood.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground mb-4">How we work</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-[0.14em] uppercase text-foreground">
              A Clear, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26522] to-[#FF7A2F]">Four-Step Process</span>
            </h2>
          </motion.div>

          <div className="relative pl-8 border-l border-border max-w-3xl mx-auto">
            {[
              { step: 'Step 1', title: 'Share Your Brief', body: 'Fill in our short inquiry form. Tell us the occasion, who you are gifting, your timeline and your budget.' },
              { step: 'Step 2', title: 'We Connect and Align', body: 'We review your brief and reach out within 24 hours via phone, WhatsApp or Zoom to discuss your ideas in detail.' },
              { step: 'Step 3', title: 'Receive a Tailored Proposal', body: 'You receive a clear proposal with creative direction, materials, packaging, timelines and investment range.' },
              { step: 'Step 4', title: 'Production and Delivery', body: 'Once approved, we move into production. We keep you updated throughout and coordinate delivery anywhere in the US.' },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pb-10 last:pb-0"
              >
                <div className="absolute -left-[33px] top-1 w-3 h-3 rounded-full bg-background border-2 border-primary shadow-[0_0_12px_rgba(242,101,34,0.5)]" />
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">{step.step}</p>
                <h3 className="text-base font-semibold tracking-[0.14em] uppercase text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-border bg-muted/40">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-3xl mx-auto">
            <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground mb-4 text-center">Trust and peace of mind</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-[0.14em] uppercase text-foreground text-center mb-12">
              Designed to Feel <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26522] to-[#FF7A2F]">Considered and Secure</span>
            </h2>
            <div className="space-y-4">
              {trustItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 text-sm text-foreground/70"
                >
                  <Shield className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-[0.14em] uppercase text-foreground mb-4">
              Let's Create Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26522] to-[#FF7A2F]">Exceptional</span>
            </h2>
            <p className="text-foreground/60 mb-8 max-w-xl mx-auto">
              If you have an idea, a milestone or a gifting brief, share it with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/customize">
                <button className="px-8 py-4 bg-gradient-to-r from-[#D94F16] to-[#FF7A2F] text-black font-semibold tracking-[0.18em] uppercase text-sm rounded-md cursor-pointer">
                  Start Custom Order
                </button>
              </a>
              <a href="/contact">
                <button className="px-8 py-4 border border-border text-foreground font-semibold tracking-[0.18em] uppercase text-sm rounded-md bg-transparent cursor-pointer">
                  Get in Touch
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
