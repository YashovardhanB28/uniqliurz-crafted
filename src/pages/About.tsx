import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Gift, Heart, Sparkles, Users, Star, Palette, Clock, Award } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Crafted with Love",
      description: "Every piece is handmade with attention to detail and genuine care for the recipient."
    },
    {
      icon: Sparkles,
      title: "Premium Quality",
      description: "We use only the finest materials to ensure each gift is a lasting treasure."
    },
    {
      icon: Gift,
      title: "Truly Unique",
      description: "Custom designs mean your gift will be one-of-a-kind, just like the person receiving it."
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Your satisfaction is our priority. We work closely with you to bring your vision to life."
    }
  ];

  const stats = [
    { number: "500+", label: "Happy Customers" },
    { number: "1000+", label: "Gifts Crafted" },
    { number: "100%", label: "Satisfaction Rate" },
    { number: "5★", label: "Average Rating" },
  ];

  const process = [
    {
      icon: Palette,
      title: "Share Your Vision",
      description: "Tell us about your idea, occasion, and who the gift is for. No concept is too big or too small!"
    },
    {
      icon: Star,
      title: "Design & Approve",
      description: "We create a digital mockup for your review. Request revisions until it's exactly what you imagined."
    },
    {
      icon: Clock,
      title: "Crafted by Hand",
      description: "Our artisans meticulously handcraft your piece using premium materials and time-tested techniques."
    },
    {
      icon: Award,
      title: "Delivered with Care",
      description: "Your finished gift arrives beautifully packaged, ready to create unforgettable memories."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-foreground mb-6"
          >
            About <span className="text-primary">UNIQLIURZ</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Where creativity meets craftsmanship to create gifts that tell your story
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section - No Image */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              Our Story
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                <span className="text-primary font-semibold">UNIQLIURZ</span> was born from a simple belief: that the best gifts are the ones 
                that carry meaning. We started as a small studio with a passion for 
                creating personalized treasures that celebrate life's special moments.
              </p>
              <p>
                Today, we've grown into a community of artisans and designers dedicated 
                to transforming your ideas into tangible expressions of love, appreciation, 
                and celebration. From resin art to engraved keepsakes, every piece we 
                create is a labor of love.
              </p>
              <p>
                What sets us apart is our commitment to <span className="text-primary font-semibold">collaboration</span>. We don't just 
                make products—we partner with you to bring your vision to life, ensuring 
                every gift is as unique as the story behind it.
              </p>
              <p className="text-primary font-medium text-xl mt-8">
                Currently making smiles across the USA — coming worldwide soon! 🌎
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Creative Process
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From your idea to a finished masterpiece — here's how we bring your vision to life
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative text-center p-6 bg-background rounded-xl border border-border"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 mt-4">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we create
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-secondary-foreground mb-4">
              Ready to Create Something Special?
            </h2>
            <p className="text-secondary-foreground/70 mb-8">
              Let's work together to bring your gift ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/customize">
                <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors">
                  Start Custom Order
                </button>
              </a>
              <a href="/contact">
                <button className="px-8 py-3 bg-secondary-foreground/10 text-secondary-foreground rounded-full font-medium hover:bg-secondary-foreground/20 transition-colors">
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
