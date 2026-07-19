import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useProduct } from "@/hooks/useProducts";
import { formatPrice } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Minus, Plus, ArrowLeft, Sparkles, Palette, Type, MessageCircle, ShoppingCart } from "lucide-react";
import { createShopifyCheckoutUrl } from "@/lib/shopify";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading, error } = useProduct(handle || "");
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [customText, setCustomText] = useState("");
  const [customColor, setCustomColor] = useState("#F26522");
  const [customNotes, setCustomNotes] = useState("");
  const [showCustomization, setShowCustomization] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const handleBuyNow = async () => {
    const variantId = product?.shopifyVariantId;
    if (!variantId) return;
    setCheckoutLoading(true);
    try {
      const url = await createShopifyCheckoutUrl(variantId, quantity);
      window.location.href = url;
    } catch (err: any) {
      toast.error('Store checkout is being configured. Please enquire via WhatsApp instead.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const generateWhatsAppMessage = () => {
    if (!product) return "";
    const lines = [
      "Hi! I am interested in:",
      "",
      "*" + product.title + "*",
      "Price: " + formatPrice(product.price, product.currencyCode),
      "Quantity: " + quantity,
    ];
    if (customText) lines.push("Personalization: " + customText);
    if (customColor !== "#F26522") lines.push("Color preference: " + customColor);
    if (customNotes) lines.push("Notes: " + customNotes);
    lines.push("", "Can you share more details and confirm availability?");
    return encodeURIComponent(lines.join("\n"));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-40">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-40 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product not found</h1>
          <Link to="/shop">
            <Button className="cursor-pointer">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link to="/shop" className="hover:text-primary transition-colors">Shop</Link></li>
              <li>/</li>
              <li className="text-foreground">{product.title}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="aspect-square bg-secondary/30 rounded-2xl overflow-hidden relative flex items-center justify-center"
              >
                <img
                  src={images[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-contain p-8"
                />
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Customizable
                </Badge>
              </motion.div>
              
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedImage === index 
                          ? "border-primary" 
                          : "border-transparent hover:border-muted-foreground/30"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-contain p-1"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {product.title}
                </h1>
                <p className="text-2xl font-semibold text-primary">
                  {formatPrice(product.price, product.currencyCode)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="default">Made to Order</Badge>
                <Badge variant="secondary">Customizable</Badge>
              </div>

              <div className="pt-4 border-t border-border">
                <button
                  onClick={() => setShowCustomization(!showCustomization)}
                  className="w-full flex items-center justify-between py-3 px-4 rounded-xl bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 hover:border-primary/40 transition-all cursor-pointer group"
                >
                  <span className="flex items-center gap-2 text-primary font-medium text-sm">
                    <Sparkles className="w-4 h-4" />
                    Make It Personal
                  </span>
                  <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                    {showCustomization ? 'Close' : 'Customize'}
                  </span>
                </button>
              </div>

              {showCustomization && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-5 p-5 bg-gradient-to-b from-secondary/50 to-background rounded-xl border border-border/60"
                >
                  <div className="flex items-center gap-3 pb-3 border-b border-border/40">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">Personalize Your Gift</h3>
                      <p className="text-xs text-muted-foreground">Make it truly one-of-a-kind</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-xs font-medium text-foreground/80 uppercase tracking-wider">
                      <Type className="w-3.5 h-3.5 text-primary" />
                      Custom Text
                    </label>
                    <div className="relative">
                      <Input
                        placeholder="Enter name, date or message"
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        maxLength={50}
                        className="bg-background/50 border-border/60 focus:border-primary pl-3"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <span className={`text-[10px] font-medium ${customText.length > 40 ? 'text-amber-400' : 'text-muted-foreground'}`}>
                          {customText.length}/50
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-xs font-medium text-foreground/80 uppercase tracking-wider">
                      <Palette className="w-3.5 h-3.5 text-primary" />
                      Color Preference
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <input
                          type="color"
                          value={customColor}
                          onChange={(e) => setCustomColor(e.target.value)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div
                          className="w-10 h-10 rounded-xl border-2 border-border/60 shadow-sm cursor-pointer"
                          style={{ backgroundColor: customColor }}
                        />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { color: "#F26522", label: "Brand" },
                          { color: "#3B82F6", label: "Blue" },
                          { color: "#10B981", label: "Green" },
                          { color: "#8B5CF6", label: "Purple" },
                          { color: "#EC4899", label: "Pink" },
                          { color: "#F59E0B", label: "Gold" },
                          { color: "#EF4444", label: "Red" },
                          { color: "#FFFFFF", label: "White" },
                        ].map(({ color, label }) => (
                          <button
                            key={color}
                            onClick={() => setCustomColor(color)}
                            className="group/tip relative"
                            title={label}
                          >
                            <div
                              className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${
                                customColor === color
                                  ? "border-foreground scale-110 shadow-md"
                                  : "border-border/40 hover:border-foreground/40"
                              }`}
                              style={{ backgroundColor: color }}
                            />
                            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] text-muted-foreground opacity-0 group-hover/tip:opacity-100 transition-opacity whitespace-nowrap">
                              {label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-xs font-medium text-foreground/80 uppercase tracking-wider">
                      Special Notes
                    </label>
                    <Textarea
                      placeholder="Font preference, design ideas, occasion details..."
                      value={customNotes}
                      onChange={(e) => setCustomNotes(e.target.value)}
                      rows={2}
                      className="bg-background/50 border-border/60 focus:border-primary resize-none text-sm"
                    />
                  </div>

                  {customText && (
                    <div className="p-4 rounded-xl bg-gradient-to-br from-background via-background to-primary/5 border border-primary/20">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2 font-medium">
                        Live Preview
                      </p>
                      <div className="flex items-center justify-center py-3 px-4 rounded-lg bg-secondary/30 border border-border/40">
                        <p
                          className="text-lg md:text-xl font-bold tracking-wide text-center"
                          style={{ color: customColor }}
                        >
                          {customText}
                        </p>
                      </div>
                      <p className="text-[10px] text-muted-foreground/60 text-center mt-2">
                        Final appearance may vary based on material and technique
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {product.shopifyVariantId && (
                  <Button
                    size="lg"
                    onClick={handleBuyNow}
                    disabled={checkoutLoading}
                    className="flex-1 bg-gradient-to-r from-[#D94F16] to-[#FF7A2F] text-black font-semibold hover:shadow-[0_0_20px_rgba(242,101,34,0.4)] transition-all cursor-pointer"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {checkoutLoading ? 'Creating Checkout...' : 'Buy Now'}
                  </Button>
                )}
                <a
                  href={"https://wa.me/15512297949?text=" + generateWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={product.shopifyVariantId ? "flex-1" : "block"}
                >
                  <Button
                    size="lg"
                    className="w-full bg-green-600 hover:bg-green-700 cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Enquire on WhatsApp
                  </Button>
                </a>
              </div>

              {product.description && (
                <div className="pt-6 border-t border-border">
                  <h3 className="font-medium text-foreground mb-2">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              <div className="pt-6 border-t border-border">
                <h3 className="font-medium text-foreground mb-4">Why Choose Us</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: "✨", text: "Handcrafted Quality" },
                    { icon: "🎨", text: "Fully Customizable" },
                    { icon: "📦", text: "Secure Packaging" },
                    { icon: "💝", text: "Gift Ready" },
                  ].map((feature) => (
                    <div key={feature.text} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{feature.icon}</span>
                      {feature.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
