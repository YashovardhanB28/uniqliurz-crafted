import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
import { Loader2, Palette, Type, Package, Send } from "lucide-react";
import { toast } from "sonner";

const Customize = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    productType: "",
    customText: "",
    color: "#FF6B35",
    finish: "",
    quantity: "1",
    name: "",
    email: "",
    notes: ""
  });

  const productTypes = [
    "Resin Art Frame",
    "Engraved Wood Bottle",
    "Wooden Keychain",
    "Custom Artwork",
    "Photo Crystal",
    "Personalized Jewelry",
    "Other"
  ];

  const finishes = [
    "Matte",
    "Glossy",
    "Satin",
    "Metallic"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Request submitted!", {
      description: "We'll review your customization and get back to you within 24 hours."
    });
    
    setFormData({
      productType: "",
      customText: "",
      color: "#FF6B35",
      finish: "",
      quantity: "1",
      name: "",
      email: "",
      notes: ""
    });
    setIsSubmitting(false);
  };

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
            Create Your <span className="text-primary">Custom</span> Gift
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Design a one-of-a-kind piece that tells your unique story
          </motion.p>
        </div>
      </section>

      {/* Customization Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Product Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    Product Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Product Type *
                      </label>
                      <Select 
                        value={formData.productType} 
                        onValueChange={(value) => setFormData({ ...formData, productType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a product" />
                        </SelectTrigger>
                        <SelectContent>
                          {productTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                      />
                    </div>
                  </div>
                </div>

                {/* Personalization */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Type className="w-5 h-5 text-primary" />
                    Personalization
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Custom Text / Name
                    </label>
                    <Input
                      placeholder="Enter text to be engraved or printed"
                      value={formData.customText}
                      onChange={(e) => setFormData({ ...formData, customText: e.target.value })}
                    />
                  </div>
                </div>

                {/* Style Options */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Palette className="w-5 h-5 text-primary" />
                    Style Options
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Primary Color
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={formData.color}
                          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                          className="w-12 h-12 rounded-lg cursor-pointer border border-border"
                        />
                        <Input
                          value={formData.color}
                          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Finish
                      </label>
                      <Select 
                        value={formData.finish} 
                        onValueChange={(value) => setFormData({ ...formData, finish: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select finish" />
                        </SelectTrigger>
                        <SelectContent>
                          {finishes.map((finish) => (
                            <SelectItem key={finish} value={finish}>{finish}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Your Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Name *
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
                        Email *
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
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Additional Notes
                    </label>
                    <Textarea
                      rows={4}
                      placeholder="Any special requests, references, or details..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Submit Custom Request
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Preview Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:sticky lg:top-32 h-fit"
            >
              <div className="bg-secondary/30 rounded-3xl p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Live Preview
                </h3>
                
                {/* Preview Box */}
                <div 
                  className="aspect-square rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden"
                  style={{ backgroundColor: `${formData.color}20` }}
                >
                  <div 
                    className="absolute inset-4 rounded-xl border-2 flex items-center justify-center"
                    style={{ borderColor: formData.color }}
                  >
                    {formData.customText ? (
                      <span 
                        className="text-2xl font-bold text-center px-4"
                        style={{ color: formData.color }}
                      >
                        {formData.customText}
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-center px-4">
                        Your text will appear here
                      </span>
                    )}
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Product:</span>
                    <span className="text-foreground font-medium">
                      {formData.productType || "Not selected"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Finish:</span>
                    <span className="text-foreground font-medium">
                      {formData.finish || "Not selected"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quantity:</span>
                    <span className="text-foreground font-medium">
                      {formData.quantity}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Color:</span>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-5 h-5 rounded-full border border-border"
                        style={{ backgroundColor: formData.color }}
                      />
                      <span className="text-foreground font-medium">
                        {formData.color.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    After submitting, our team will review your request and send you a 
                    detailed quote within 24 hours.
                  </p>
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

export default Customize;
