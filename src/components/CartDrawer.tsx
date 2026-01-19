import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2, X } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);
  const currencyCode = items[0]?.price.currencyCode || 'USD';

  useEffect(() => { 
    if (isOpen) syncCart(); 
  }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  };

  return (
    <>
      {/* Cart Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative w-10 h-10 flex items-center justify-center text-primary-foreground/80 hover:text-primary transition-colors duration-200"
      >
        <ShoppingCart className="w-5 h-5" />
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center"
            >
              {totalItems}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-secondary/80 backdrop-blur-sm z-50"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full sm:max-w-md bg-background shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div>
                  <h2 className="text-xl font-display font-bold text-foreground">Shopping Cart</h2>
                  <p className="text-sm text-muted-foreground">
                    {totalItems === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <ShoppingCart className="w-16 h-16 text-muted-foreground/30 mb-4" />
                    <p className="text-lg font-medium text-muted-foreground mb-2">Your cart is empty</p>
                    <p className="text-sm text-muted-foreground/70">Add some beautiful gifts to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.variantId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-4 p-4 bg-muted/30 rounded-lg"
                      >
                        <div className="w-20 h-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
                          {item.product.node.images?.edges?.[0]?.node && (
                            <img 
                              src={item.product.node.images.edges[0].node.url} 
                              alt={item.product.node.title} 
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground truncate">{item.product.node.title}</h4>
                          {item.variantTitle !== 'Default Title' && (
                            <p className="text-sm text-muted-foreground">{item.variantTitle}</p>
                          )}
                          <p className="font-semibold text-primary mt-1">
                            {formatPrice(item.price.amount, item.price.currencyCode)}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <button 
                            onClick={() => removeItem(item.variantId)}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <div className="flex items-center gap-1 bg-background rounded-full border border-border">
                            <button 
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded-full transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded-full transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-border bg-background">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-medium">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      {formatPrice(totalPrice.toString(), currencyCode)}
                    </span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    disabled={items.length === 0 || isLoading || isSyncing}
                    className="w-full btn-primary rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading || isSyncing ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <ExternalLink className="w-5 h-5" />
                        Proceed to Checkout
                      </>
                    )}
                  </button>
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    Secure checkout powered by Shopify
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};