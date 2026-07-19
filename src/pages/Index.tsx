import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ChevronDown, Shield, ZoomIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef, useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductMarquee } from '@/components/ProductMarquee';
import { ScrollSequence } from '@/components/ScrollSequence';
import { useSEO } from '@/hooks/useSEO';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import allProducts from '@/data/products';

const ENABLE_SCROLL_SEQUENCE = false;
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
};

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [8, -8]), { damping: 20 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-8, 8]), { damping: 20 });

  function handleMouse(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const categoryGradients: Record<string, string> = {
  'resin-art': 'from-violet-800/40 to-neutral-900',
  'engraved': 'from-amber-800/40 to-neutral-900',
  'frames': 'from-orange-800/40 to-neutral-900',
  'bottles': 'from-sky-800/40 to-neutral-900',
  'keychains': 'from-emerald-800/40 to-neutral-900',
  'custom': 'from-rose-800/40 to-neutral-900',
};

const faqs = [
  {
    question: "How long does it take to make a custom order?",
    answer: "Most custom orders are crafted within 5-7 business days, depending on complexity. Rush orders are available upon request for an additional fee."
  },
  {
    question: "Can I see a preview before my order is made?",
    answer: "Absolutely. For all custom orders, we send you a digital mockup for approval before we start crafting. You can request revisions until you are completely satisfied."
  },
  {
    question: "What materials do you use?",
    answer: "We use premium quality materials including high-grade resin, natural wood, eco-friendly paints and durable finishes to ensure your gift lasts a lifetime."
  },
  {
    question: "Do you offer gift wrapping?",
    answer: "Yes. Every order comes beautifully packaged in our signature gift box with a personalized card at no extra charge."
  },
  {
    question: "What is your return policy?",
    answer: "We stand behind our craftsmanship. If you are not satisfied with your order, reach out within 14 days and we will make it right, guaranteed."
  },
  {
    question: "Where do you deliver?",
    answer: "We currently serve customers across the USA. Every piece is made to order and shipped with care from our studio in New Jersey."
  }
];

const offerings = [
  'Bespoke Gift Boxes and Luxury Hampers',
  'Engraved Keepsakes and Awards',
  'Custom Resin Art: walls, tables and memorabilia',
  'Branded Pieces for Client Gifting or Merch',
  'Premium Custom Apparel and Office Merchandise',
  'Event and Celebration Favors',
  'Live Personalization Stations for Events',
  'Hands-on Creative Workshops and DIY Kits',
];

const Index = () => {
  useSEO();
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const featuredProducts = useMemo(() =>
    allProducts.filter(p => p.featured).slice(0, 6),
  []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <ProductMarquee />
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at top center, rgba(242,101,34,0.50), transparent 60%),
              radial-gradient(circle at bottom right, rgba(255,122,47,0.12), transparent 60%),
              hsl(var(--background))
            `,
            opacity: heroOpacity
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/25 via-transparent to-background" />

        <motion.div
          className="container relative z-10 mx-auto px-4 text-center pt-24"
          style={{ scale: heroScale }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.p
              className="text-xs md:text-sm tracking-[0.24em] uppercase text-muted-foreground mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              Luxury gifting and keepsakes from New Jersey, USA
            </motion.p>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.16em] uppercase leading-[1.1] mb-6 text-foreground"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.8 }}
            >
              Elevated Gifting.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26522] to-[#FF7A2F]">Designed with Purpose.</span>
            </motion.h1>

            <motion.p
              className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto mb-4 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Thoughtfully curated hampers, keepsakes and branded pieces that feel personal, polished and impossible to forget.
            </motion.p>

            <motion.p
              className="text-sm md:text-base text-foreground/60 max-w-xl mx-auto mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Have something in mind? Share it with us and we will help you shape it into a memorable experience for individuals, teams and brands across the US.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Link to="/customize">
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-[#D94F16] to-[#FF7A2F] text-black font-semibold tracking-[0.18em] uppercase text-sm rounded-md cursor-pointer"
                  whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(242,101,34,0.6)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Your Project
                </motion.button>
              </Link>
              <Link to="/shop">
                <motion.button
                  className="px-8 py-4 border border-border text-foreground font-semibold tracking-[0.18em] uppercase text-sm rounded-md bg-transparent cursor-pointer"
                  whileHover={{ scale: 1.03, borderColor: '#F26522', color: '#F26522' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore Our Work
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {[
                'For milestones and celebrations',
                'For teams, clients and leaders',
                'One of a kind, made to order'
              ].map((item, i) => (
                <div key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#D94F16] to-[#FF7A2F] shadow-[0_0_8px_rgba(242,101,34,0.6)]" />
                  <span className="text-[10px] md:text-xs tracking-[0.18em] uppercase text-muted-foreground">{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-6 h-6 text-primary" />
        </motion.div>
      </section>

      {ENABLE_SCROLL_SEQUENCE && (
        <ScrollSequence
          framesDir="/frames"
          totalFrames={1000}
          frameExt="jpg"
          height="300vh"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-foreground mb-4"
          >
            See the Craft
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26522] to-[#FF7A2F]">Frame by Frame</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-lg text-foreground/80 max-w-xl mx-auto"
          >
            Scroll through the making of a custom piece. Every detail matters when it is made by hand.
          </motion.p>
        </ScrollSequence>
      )}

      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div {...fadeUp}>
              <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground mb-4">About Uniqliurz</p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-[0.14em] uppercase text-foreground leading-tight">
                A Studio Built Around<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26522] to-[#FF7A2F]">Meaningful Design</span>
              </h2>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.15 }}>
              <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-6">
                At Uniqliurz, every creation begins with intention. We transform life's milestones and business moments into refined, personalized keepsakes crafted with care.
              </p>
              <p className="text-base md:text-lg text-foreground/70 leading-relaxed mb-6">
                From private celebrations to corporate partnerships, our work blends aesthetic detail with emotional relevance so gifts feel considered, not generic.
              </p>
              <p className="text-base md:text-lg text-foreground/70 leading-relaxed">
                Based in New Jersey, we ship across the United States. Every piece is made to order and no two creations are ever the same.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <motion.div {...fadeUp}>
              <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground mb-4">Work and Capabilities</p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-[0.14em] uppercase text-foreground leading-tight">
                Selected Creations<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26522] to-[#FF7A2F]">and What We Offer</span>
              </h2>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
              <p className="text-base md:text-lg text-foreground/70 leading-relaxed">
                Every piece we create is unique. Browse our catalog of work for individuals marking milestones and for businesses building deeper connections with their people.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((item, i) => (
              <TiltCard key={item.id} className="group rounded-xl border border-border bg-card overflow-hidden cursor-default">
                <div className={`relative w-full pt-[72%] bg-gradient-to-br ${categoryGradients[item.category] || 'from-neutral-800/40 to-neutral-900'} overflow-hidden`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-contain p-6 transition-all duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <button
                    onClick={() => setSelectedProduct(selectedProduct === i ? null : i)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                    aria-label={`View details for ${item.title}`}
                  >
                    <ZoomIn className="w-4 h-4 text-white" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-card via-card/80 to-transparent">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-primary">{item.category}</p>
                    <p className="text-sm font-medium text-foreground mt-1">{item.title}</p>
                  </div>
                </div>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: selectedProduct === i ? 'auto' : 0, opacity: selectedProduct === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-2 border-t border-border">
                    <p className="text-sm text-foreground/70 leading-relaxed">{item.description}</p>
                    <Link to={"/product/" + item.handle}>
                      <span className="inline-block mt-3 text-xs tracking-[0.18em] uppercase text-primary font-semibold hover:underline cursor-pointer">
                        View Details
                      </span>
                    </Link>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>

          <motion.div {...fadeUp} className="mt-12 text-center">
            <Link to="/shop">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-[#D94F16] to-[#FF7A2F] text-black font-semibold tracking-[0.18em] uppercase text-sm rounded-md cursor-pointer"
                whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(242,101,34,0.6)' }}
                whileTap={{ scale: 0.98 }}
              >
                View Full Catalog
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24 border-t border-border bg-muted/40">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground mb-4">Our Capabilities</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-[0.14em] uppercase text-foreground leading-tight">
              What We<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26522] to-[#FF7A2F]">Create</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {offerings.map((offering, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                className="flex items-center gap-3 px-5 py-4 rounded-lg border border-border bg-card"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                <span className="text-sm text-foreground/80">{offering}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div {...fadeUp}>
              <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground mb-4">Consultation model</p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-[0.14em] uppercase text-foreground leading-tight">
                Begin With<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26522] to-[#FF7A2F]">a Conversation</span>
              </h2>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
              <p className="text-base md:text-lg text-foreground/70 leading-relaxed">
                Every project starts with a focused conversation. Tell us about the occasion, the people involved and what you have in mind. We will take it from there.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[
              {
                header: 'Personal Clients',
                title: 'Personal Gift Inquiry',
                body: 'Share your idea via our short form or WhatsApp. Ideal for birthdays, weddings, anniversaries and intimate celebrations. Tell us your idea, timeline and budget and we will come back to you with a tailored suggestion.',
                button: 'Submit Personal Inquiry',
                link: '/customize'
              },
              {
                header: 'Corporate Clients',
                title: 'Corporate Gifting Inquiry',
                body: 'Designed for teams planning client gifting, leadership recognition, product launches or internal events. Share your brief and we will respond with a proposal aligned to your brand and budget.',
                button: 'Submit Corporate Inquiry',
                link: '/contact'
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-xl border border-border bg-card p-6 md:p-8 flex flex-col justify-between gap-6"
              >
                <div>
                  <p className="text-[10px] tracking-[0.24em] uppercase text-muted-foreground mb-2">{card.header}</p>
                  <h3 className="text-lg tracking-[0.18em] uppercase text-foreground mb-3">{card.title}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{card.body}</p>
                </div>
                <div>
                  <Link to={card.link}>
                    <motion.button
                      className="px-6 py-3 bg-gradient-to-r from-[#D94F16] to-[#FF7A2F] text-black text-xs font-semibold tracking-[0.18em] uppercase rounded-md cursor-pointer"
                      whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(242,101,34,0.5)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {card.button}
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <motion.div {...fadeUp}>
              <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground mb-4">How we work</p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-[0.14em] uppercase text-foreground leading-tight">
                A Clear,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26522] to-[#FF7A2F]">Four-Step Process</span>
              </h2>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
              <p className="text-base md:text-lg text-foreground/70 leading-relaxed">
                We keep the path from idea to delivery simple and transparent so you always know what is happening next.
              </p>
            </motion.div>
          </div>

          <div className="relative pl-8 border-l border-border max-w-3xl">
            {[
              { step: 'Step 1', title: 'Share Your Brief', body: 'Fill in our short inquiry form. Tell us the occasion, who you are gifting, your timeline and your budget. No commitment required at this stage.' },
              { step: 'Step 2', title: 'We Connect and Align', body: 'We review your brief and reach out within 24 hours via phone, WhatsApp or Zoom to discuss your ideas in detail and answer any questions.' },
              { step: 'Step 3', title: 'Receive a Tailored Proposal', body: 'You receive a clear proposal with creative direction, materials, packaging, timelines and investment range. We refine it together until it is exactly right.' },
              { step: 'Step 4', title: 'Production and Delivery', body: 'Once approved, we move into production. We keep you updated throughout and coordinate delivery so everything arrives ready to be gifted anywhere in the US.' },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative pb-10 last:pb-0"
              >
                <div className="absolute -left-[33px] top-1 w-3 h-3 rounded-full bg-background border-2 border-primary shadow-[0_0_12px_rgba(242,101,34,0.5)]" />
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">{step.step}</p>
                <h3 className="text-base font-semibold tracking-[0.14em] uppercase text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed max-w-2xl">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-border bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div {...fadeUp}>
              <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground mb-4">Trust and peace of mind</p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-[0.14em] uppercase text-foreground leading-tight">
                Designed to Feel<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26522] to-[#FF7A2F]">Considered and Secure</span>
              </h2>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
              <p className="text-base md:text-lg text-foreground/70 leading-relaxed mb-6">
                Behind every creation, we keep the logistics straightforward and professional so you can focus entirely on the people you are gifting.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-3 max-w-3xl"
          >
            {[
              'Uniqliurz LLC is a registered single-member LLC based in New Jersey, USA.',
              'Secure payment processing through Shopify checkout, trusted by millions of businesses worldwide.',
              'Clear proposals and documentation suitable for internal approvals, budgets and record-keeping.',
              'A defined process that outlines every key decision before production begins with no surprises.',
              'Thoughtful packaging and presentation so gifts feel ready the moment they arrive.',
              'Nationwide shipping across the United States. We handle the logistics.',
            ].map((item, i) => (
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
          </motion.div>
        </div>
      </section>

      <TestimonialsSection />

      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground mb-4">FAQ</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-[0.14em] uppercase text-foreground">
              Frequently Asked<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26522] to-[#FF7A2F]">Questions</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-border rounded-lg px-6 bg-card"
                >
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-medium text-sm text-foreground/90">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-foreground/60">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-5xl font-bold tracking-[0.14em] uppercase text-foreground mb-4">
              Let's Create Something<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26522] to-[#FF7A2F]">Exceptional</span>
            </h2>
            <p className="text-foreground/60 mb-8 max-w-xl mx-auto">
              If you have an idea, a milestone or a gifting brief, share it with us. We will help you turn it into something people will remember.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/customize">
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-[#D94F16] to-[#FF7A2F] text-black font-semibold tracking-[0.18em] uppercase text-sm rounded-md cursor-pointer"
                  whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(242,101,34,0.6)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Begin Your Inquiry
                </motion.button>
              </Link>
              <a href="https://wa.me/15512297949" target="_blank" rel="noopener noreferrer">
                <motion.button
                  className="px-8 py-4 border border-border text-foreground font-semibold tracking-[0.18em] uppercase text-sm rounded-md bg-transparent cursor-pointer"
                  whileHover={{ scale: 1.03, borderColor: '#F26522', color: '#F26522' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Chat on WhatsApp
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
