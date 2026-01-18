import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useProduct } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Minus, Plus, ArrowLeft, Check, ShoppingBag, Sparkles, Palette, Type } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading, error } = useProduct(handle || "");
  const { addItem, isLoading: isAddingToCart } = useCartStore();
  
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Customization state
  const [customText, setCustomText] = useState("");
  const [customColor, setCustomColor] = useState("#FF6B35");
  const [customNotes, setCustomNotes] = useState("");
  const [showCustomization, setShowCustomization] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Initialize selected options when product loads - using useEffect to avoid setting state during render
  if (product && !initialized && product.options) {
    const initialOptions: Record<string, string> = {};
    product.options.forEach(option => {
      if (option.values.length > 0) {
        initialOptions[option.name] = option.values[0];
      }
    });
    
    // Find matching variant
    const matchingVariant = product.variants.edges.find(v => 
      v.node.selectedOptions.every(opt => initialOptions[opt.name] === opt.value)
    );
    
    // Use setTimeout to defer state updates to next tick
    setTimeout(() => {
      setSelectedOptions(initialOptions);
      if (matchingVariant) {
        setSelectedVariant(matchingVariant.node.id);
      }
      setInitialized(true);
    }, 0);
  }

  const handleOptionChange = (optionName: string, value: string) => {
    const newOptions = { ...selectedOptions, [optionName]: value };
    setSelectedOptions(newOptions);
    
    // Find matching variant
    if (product) {
      const matchingVariant = product.variants.edges.find(v => 
        v.node.selectedOptions.every(opt => newOptions[opt.name] === opt.value)
      );
      if (matchingVariant) {
        setSelectedVariant(matchingVariant.node.id);
      }
    }
  };

  const currentVariant = product?.variants.edges.find(v => v.node.id === selectedVariant)?.node;

  const handleAddToCart = async () => {
    if (!product || !currentVariant) return;
    
    try {
      // Include customization in selected options
      const customOptions = [
        ...currentVariant.selectedOptions,
        ...(customText ? [{ name: "Custom Text", value: customText }] : []),
        ...(customColor !== "#FF6B35" ? [{ name: "Custom Color", value: customColor }] : []),
        ...(customNotes ? [{ name: "Special Notes", value: customNotes }] : []),
      ];

      await addItem({
        product: { node: product },
        variantId: currentVariant.id,
        variantTitle: currentVariant.title,
        price: currentVariant.price,
        quantity,
        selectedOptions: customOptions,
      });
      
      toast.success("Added to cart!", {
        description: `${product.title}${customText ? ` - "${customText}"` : ""} x${quantity}`,
      });
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-40">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
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
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images.edges;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
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
            {/* Image Gallery */}
            <div className="space-y-4">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="aspect-square bg-secondary/30 rounded-2xl overflow-hidden relative"
              >
                {images[selectedImage]?.node ? (
                  <img
                    src={images[selectedImage].node.url}
                    alt={images[selectedImage].node.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}
                
                {/* Customizable badge */}
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Customizable
                </Badge>
              </motion.div>
              
              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index 
                          ? "border-primary" 
                          : "border-transparent hover:border-muted-foreground/30"
                      }`}
                    >
                      <img
                        src={img.node.url}
                        alt={img.node.altText || `${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {product.title}
                </h1>
                <p className="text-2xl font-semibold text-primary">
                  {currentVariant 
                    ? formatPrice(currentVariant.price.amount, currentVariant.price.currencyCode)
                    : formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)
                  }
                </p>
              </div>

              {/* Availability */}
              {currentVariant && (
                <Badge variant={currentVariant.availableForSale ? "default" : "secondary"}>
                  {currentVariant.availableForSale ? (
                    <><Check className="w-3 h-3 mr-1" /> In Stock</>
                  ) : (
                    "Out of Stock"
                  )}
                </Badge>
              )}

              {/* Product Options from Shopify */}
              {product.options && product.options.length > 0 && product.options[0].values.length > 1 && (
                <div className="space-y-4">
                  {product.options.map((option) => (
                    <div key={option.name}>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {option.name}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {option.values.map((value) => (
                          <button
                            key={value}
                            onClick={() => handleOptionChange(option.name, value)}
                            className={`px-4 py-2 rounded-lg border transition-all ${
                              selectedOptions[option.name] === value
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Customization Toggle */}
              <div className="pt-4 border-t border-border">
                <button
                  onClick={() => setShowCustomization(!showCustomization)}
                  className="flex items-center gap-2 text-primary font-medium hover:underline"
                >
                  <Sparkles className="w-5 h-5" />
                  {showCustomization ? "Hide" : "Add"} Personalization Options
                </button>
              </div>

              {/* Customization Options */}
              {showCustomization && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 p-4 bg-secondary/30 rounded-xl border border-border"
                >
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Personalize Your Gift
                  </h3>
                  
                  {/* Custom Text */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                      <Type className="w-4 h-4" />
                      Custom Text / Name
                    </label>
                    <Input
                      placeholder="Enter text to be engraved or printed"
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      maxLength={50}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {customText.length}/50 characters
                    </p>
                  </div>

                  {/* Color Picker */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                      <Palette className="w-4 h-4" />
                      Preferred Color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={customColor}
                        onChange={(e) => setCustomColor(e.target.value)}
                        className="w-12 h-12 rounded-lg cursor-pointer border border-border"
                      />
                      <div className="flex flex-wrap gap-2">
                        {["#FF6B35", "#3B82F6", "#10B981", "#8B5CF6", "#EC4899", "#F59E0B"].map((color) => (
                          <button
                            key={color}
                            onClick={() => setCustomColor(color)}
                            className={`w-8 h-8 rounded-full border-2 transition-all ${
                              customColor === color ? "border-foreground scale-110" : "border-transparent"
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Special Notes */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Special Instructions (Optional)
                    </label>
                    <Textarea
                      placeholder="Any specific requests, font preferences, or design notes..."
                      value={customNotes}
                      onChange={(e) => setCustomNotes(e.target.value)}
                      rows={3}
                    />
                  </div>

                  {/* Preview */}
                  {customText && (
                    <div className="p-4 rounded-lg bg-background border border-primary/30">
                      <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                      <p 
                        className="text-xl font-bold"
                        style={{ color: customColor }}
                      >
                        "{customText}"
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Quantity */}
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
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart */}
              <Button
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
                disabled={!currentVariant?.availableForSale || isAddingToCart}
              >
                {isAddingToCart ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>

              {/* Description */}
              {product.description && (
                <div className="pt-6 border-t border-border">
                  <h3 className="font-medium text-foreground mb-2">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Features */}
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
