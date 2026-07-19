import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import products, { LocalProduct } from "@/data/products";
import { Calendar, DollarSign, Package, Send, MessageCircle, Gift, Users } from "lucide-react";
import { toast } from "sonner";

const WHATSAPP_NUMBER = "15512297949";
const BUSINESS_EMAIL = "hello@uniqliurz.com";

const occasions = [
  "Birthday",
  "Anniversary",
  "Wedding",
  "Housewarming",
  "Corporate Gift",
  "Festival / Diwali",
  "Valentine's Day",
  "Mother's Day / Father's Day",
  "Graduation",
  "Baby Shower",
  "Other"
];

const budgetRanges = [
  "Under $50",
  "$50 - $100",
  "$100 - $250",
  "$250 - $500",
  "$500 - $1,000",
  "Above $1,000"
];

const Customize = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    // Customer Info
    name: "",
    email: "",
    phone: "",
    // Order Details
    selectedProduct: "",
    customProductDescription: "",
    occasion: "",
    budget: "",
    dateRequired: "",
    quantity: "1",
    // Additional
    personalizationText: "",
    specialInstructions: ""
  });

  const isOtherProduct = formData.selectedProduct === "other";

  const generateMessage = () => {
    const lines = [
      `🎁 *NEW CUSTOM ORDER REQUEST*`,
      ``,
      `*Customer Details:*`,
      `• Name: ${formData.name}`,
      `• Email: ${formData.email}`,
      `• Phone: ${formData.phone}`,
      ``,
      `*Order Details:*`,
      `• Product: ${isOtherProduct ? formData.customProductDescription : formData.selectedProduct}`,
      `• Occasion: ${formData.occasion}`,
      `• Budget: ${formData.budget}`,
      `• Quantity: ${formData.quantity}`,
      `• Required By: ${formData.dateRequired}`,
    ];

    if (formData.personalizationText) {
      lines.push(`• Personalization: ${formData.personalizationText}`);
    }

    if (formData.specialInstructions) {
      lines.push(``, `*Special Instructions:*`, formData.specialInstructions);
    }

    return lines.join('\n');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all contact details");
      setIsSubmitting(false);
      return;
    }

    if (!formData.selectedProduct) {
      toast.error("Please select a product");
      setIsSubmitting(false);
      return;
    }

    if (isOtherProduct && !formData.customProductDescription) {
      toast.error("Please describe what you're looking for");
      setIsSubmitting(false);
      return;
    }

    if (!formData.occasion || !formData.budget) {
      toast.error("Please fill in occasion and budget");
      setIsSubmitting(false);
      return;
    }

    // Generate message and open WhatsApp
    const message = generateMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    toast.success("Request prepared!", {
      description: "Complete your inquiry on WhatsApp. We'll respond within 24 hours."
    });

    setIsSubmitting(false);
  };

  const handleEmailSubmit = () => {
    const subject = encodeURIComponent(`Custom Order Request - ${formData.occasion}`);
    const body = encodeURIComponent(generateMessage().replace(/\*/g, '').replace(/•/g, '-'));
    window.open(`mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
          >
            <Gift className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Custom Orders</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            Request a <span className="text-primary">Custom Gift</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Tell us about your perfect gift. Fill the form below and we'll get back to you with a quote within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-10"
          >
            {/* Contact Information */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Your Information</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <Input
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone / WhatsApp *
                  </label>
                  <Input
                    required
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address *
                </label>
                <Input
                  required
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Product Selection */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Product Inquiry</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Select Product *
                </label>
                <Select
                  value={formData.selectedProduct}
                  onValueChange={(value) => setFormData({ ...formData, selectedProduct: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a product or 'Other'" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((p: LocalProduct) => (
                      <SelectItem key={p.id} value={p.title}>
                        {p.title}
                      </SelectItem>
                    ))}
                    <SelectItem value="other" className="font-medium text-primary">
                      ✨ Other / Custom Request
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {isOtherProduct && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Describe what you're looking for *
                  </label>
                  <Textarea
                    required={isOtherProduct}
                    rows={3}
                    placeholder="E.g., A custom resin art piece with preserved flowers, or an engraved wooden plaque..."
                    value={formData.customProductDescription}
                    onChange={(e) => setFormData({ ...formData, customProductDescription: e.target.value })}
                  />
                </motion.div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Personalization Text (optional)
                </label>
                <Input
                  placeholder="Name, message, or text to be engraved/printed"
                  value={formData.personalizationText}
                  onChange={(e) => setFormData({ ...formData, personalizationText: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Quantity
                </label>
                <Input
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-32"
                />
              </div>
            </div>

            {/* Occasion & Budget */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Occasion & Timeline</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Occasion *
                  </label>
                  <Select
                    value={formData.occasion}
                    onValueChange={(value) => setFormData({ ...formData, occasion: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select occasion" />
                    </SelectTrigger>
                    <SelectContent>
                      {occasions.map((occ) => (
                        <SelectItem key={occ} value={occ}>{occ}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    When do you need it?
                  </label>
                  <Input
                    type="date"
                    value={formData.dateRequired}
                    onChange={(e) => setFormData({ ...formData, dateRequired: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Budget Range *
                </label>
                <Select
                  value={formData.budget}
                  onValueChange={(value) => setFormData({ ...formData, budget: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map((range) => (
                      <SelectItem key={range} value={range}>{range}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Special Instructions */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Additional Details</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Special Instructions or Reference Images Links
                </label>
                <Textarea
                  rows={4}
                  placeholder="Share any specific requirements, reference image links (Pinterest, Google Drive, etc.), color preferences, or anything else we should know..."
                  value={formData.specialInstructions}
                  onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                type="submit" 
                size="lg" 
                className="flex-1 bg-green-600 hover:bg-green-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Send via WhatsApp
                  </>
                )}
              </Button>
              <Button 
                type="button"
                variant="outline"
                size="lg" 
                className="flex-1"
                onClick={handleEmailSubmit}
              >
                <Send className="w-5 h-5 mr-2" />
                Send via Email
              </Button>
            </div>

            <p className="text-sm text-center text-muted-foreground">
              We typically respond within 24 hours with a detailed quote and mockup.
            </p>
          </motion.form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Customize;
