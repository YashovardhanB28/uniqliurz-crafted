import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Loader2, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const WHATSAPP_NUMBER = "15512297949";

  const generateMessage = () => {
    const lines = [
      `📬 *NEW CONTACT FORM MESSAGE*`,
      ``,
      `*Name:* ${formData.name}`,
      `*Email:* ${formData.email}`,
      `*Subject:* ${formData.subject}`,
      ``,
      `*Message:*`,
      formData.message,
    ];
    return encodeURIComponent(lines.join('\n'));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${generateMessage()}`;
    window.open(whatsappUrl, '_blank');

    toast.success("Message prepared!", {
      description: "Complete sending on WhatsApp. We will get back to you within 24 hours."
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "+1 551 229 7949",
      href: "tel:+15512297949"
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "+1 551 229 7949",
      href: "https://wa.me/15512297949"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "New Jersey, USA",
      href: null
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-36 pb-20">
        <div className="container mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs tracking-[0.24em] uppercase text-muted-foreground mb-5"
          >
            Get in touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-4xl md:text-6xl font-bold tracking-[0.16em] uppercase text-foreground"
          >
            Let's Start a<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26522] to-[#FF7A2F]">Conversation</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-foreground/60 mt-6 max-w-xl mx-auto"
          >
            Have a question or want to discuss a custom order? We would love to hear from you.
          </motion.p>
        </div>
      </section>

      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-lg tracking-[0.18em] uppercase text-foreground mb-8">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-2">Name</label>
                    <Input
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-card border-border text-foreground placeholder:text-foreground/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-2">Email</label>
                    <Input
                      required
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-card border-border text-foreground placeholder:text-foreground/30"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-2">Subject</label>
                  <Input
                    required
                    placeholder="What is this about?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="bg-card border-border text-foreground placeholder:text-foreground/30"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-2">Message</label>
                  <Textarea
                    required
                    rows={6}
                    placeholder="Tell us about your project or ask us anything..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-card border-border text-foreground placeholder:text-foreground/30"
                  />
                </div>
                <Button type="submit" size="lg" disabled={isSubmitting} className="bg-gradient-to-r from-[#D94F16] to-[#FF7A2F] text-black font-semibold hover:shadow-[0_0_20px_rgba(242,101,34,0.5)] cursor-pointer">
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-lg tracking-[0.18em] uppercase text-foreground mb-8">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl border border-border bg-card flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{info.label}</p>
                        {info.href ? (
                          <a 
                            href={info.href}
                            className="text-foreground font-medium hover:text-primary transition-colors"
                            target={info.href.startsWith('http') ? '_blank' : undefined}
                            rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-foreground font-medium">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-xs tracking-[0.18em] uppercase text-muted-foreground mb-6">Frequently Asked Questions</h3>
                <div className="space-y-5">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">How long does a custom order take?</p>
                    <p className="text-sm text-foreground/50">Most custom orders are completed within 5-7 business days.</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Do you ship across the US?</p>
                    <p className="text-sm text-foreground/50">Yes. We ship nationwide from New Jersey with tracking on all orders.</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Can I see a preview before production?</p>
                    <p className="text-sm text-foreground/50">Absolutely. We provide digital mockups for your approval before we start crafting.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
