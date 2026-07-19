import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useEnquiryStore } from "@/stores/enquiryStore";
import { formatPrice } from "@/data/products";
import { Trash2, Minus, Plus, Send, ShoppingBag, ArrowLeft, User, Mail, Phone, Calendar, MessageSquare, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

const occasions = [
  "Birthday",
  "Anniversary",
  "Wedding",
  "Corporate Gift",
  "Festival",
  "Valentine's Day",
  "Mother's Day / Father's Day",
  "Graduation",
  "Baby Shower",
  "Just Because",
  "Other",
];

const Enquiry = () => {
  const items = useEnquiryStore(s => s.items);
  const formData = useEnquiryStore(s => s.formData);
  const updateForm = useEnquiryStore(s => s.updateForm);
  const removeItem = useEnquiryStore(s => s.removeItem);
  const updateQuantity = useEnquiryStore(s => s.updateQuantity);
  const resetForm = useEnquiryStore(s => s.resetForm);
  const clearItems = useEnquiryStore(s => s.clearItems);
  const generateMessage = useEnquiryStore(s => s.generateWhatsAppMessage);
  const [submitting, setSubmitting] = useState(false);

  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const handleSubmit = () => {
    if (!formData.name || !formData.phone) {
      toast.error("Please provide your name and phone number");
      return;
    }
    if (items.length === 0) {
      toast.error("Please add at least one product to your enquiry");
      return;
    }
    setSubmitting(true);
    const message = generateMessage();
    window.open(`https://wa.me/15512297949?text=${message}`, "_blank");
    toast.success("Enquiry submitted! We will get back to you within 24 hours.");
    resetForm();
    clearItems();
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="pt-28 pb-12 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            Your Enquiry
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Review your selections and share your details. We will respond with a quote within 24 hours.
          </motion.p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <ShoppingBag className="w-20 h-20 text-muted-foreground/20 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-foreground mb-3">Your enquiry list is empty</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Browse our products and add items you are interested in. You can enquire about multiple products at once.
              </p>
              <Link to="/shop">
                <span className="inline-block px-8 py-4 bg-gradient-to-r from-[#D94F16] to-[#FF7A2F] text-black font-semibold rounded-lg hover:shadow-[0_0_25px_rgba(242,101,34,0.4)] transition-all cursor-pointer">
                  Browse Products
                </span>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Left: Product List */}
              <div className="lg:col-span-3 space-y-6">
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-foreground">Selected Products ({items.length})</h2>
                    <button
                      onClick={() => { clearItems(); toast.success("Enquiry list cleared"); }}
                      className="text-xs text-muted-foreground hover:text-destructive transition-colors cursor-pointer bg-transparent border-none"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <motion.div
                        key={item.product.id}
                        layout
                        className="flex gap-4 p-4 bg-muted/20 rounded-xl border border-border/50"
                      >
                        <div className="w-20 h-20 bg-muted rounded-xl overflow-hidden flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.title}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link to={`/product/${item.product.handle}`} className="hover:text-primary transition-colors">
                            <h3 className="font-medium text-foreground truncate">{item.product.title}</h3>
                          </Link>
                          <p className="text-sm text-muted-foreground mt-0.5">{formatPrice(item.product.price, item.product.currencyCode)} each</p>
                          <p className="font-semibold text-primary mt-1">{formatPrice(item.product.price * item.quantity, item.product.currencyCode)}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <div className="flex items-center gap-1 bg-background rounded-full border border-border">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded-full transition-colors cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded-full transition-colors cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-4 mt-4 border-t border-border">
                    <span className="text-muted-foreground">Estimated Total</span>
                    <span className="text-2xl font-bold text-primary">{formatPrice(totalPrice, "USD")}</span>
                  </div>
                </div>
              </div>

              {/* Right: Form */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-card border border-border rounded-2xl p-6 sticky top-28">
                  <h2 className="text-lg font-bold text-foreground mb-6">Your Details</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
                        <User className="w-3 h-3" /> Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={e => updateForm({ name: e.target.value })}
                        className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
                        <Phone className="w-3 h-3" /> Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 551 229 7949"
                        value={formData.phone}
                        onChange={e => updateForm({ phone: e.target.value })}
                        className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
                        <Mail className="w-3 h-3" /> Email
                      </label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={e => updateForm({ email: e.target.value })}
                        className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
                        <Calendar className="w-3 h-3" /> Occasion
                      </label>
                      <select
                        value={formData.occasion}
                        onChange={e => updateForm({ occasion: e.target.value })}
                        className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                      >
                        <option value="">Select occasion</option>
                        {occasions.map(o => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
                        <MessageSquare className="w-3 h-3" /> Special Requests
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Color preferences, design ideas, timeline..."
                        value={formData.notes}
                        onChange={e => updateForm({ notes: e.target.value })}
                        className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
                        <ImageIcon className="w-3 h-3" /> Reference Images / Links
                      </label>
                      <input
                        type="text"
                        placeholder="Paste links to Pinterest, Google Drive, Instagram..."
                        value={formData.referenceLinks}
                        onChange={e => updateForm({ referenceLinks: e.target.value })}
                        className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="w-full mt-6 bg-gradient-to-r from-[#D94F16] to-[#FF7A2F] text-black font-semibold rounded-lg py-4 flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(242,101,34,0.4)] transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-5 h-5" />
                    {submitting ? "Submitting..." : "Send Enquiry via WhatsApp"}
                  </button>
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    We typically respond within 24 hours
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Enquiry;
