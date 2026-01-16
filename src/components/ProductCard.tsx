import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import { ShopifyProduct, formatPrice } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';

interface ProductCardProps {
  product: ShopifyProduct;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { node } = product;
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const firstVariant = node.variants.edges[0]?.node;
  const image = node.images.edges[0]?.node;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariant) return;
    
    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || []
    });
    
    toast.success('Added to cart!', { description: node.title });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/product/${node.handle}`} className="group block">
        <div className="product-card bg-card border border-border overflow-hidden">
          <div className="relative aspect-square overflow-hidden bg-muted">
            {image ? (
              <img
                src={image.url}
                alt={image.altText || node.title}
                className="product-card-image w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>
            )}
            
            <div className="absolute inset-0 bg-secondary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                disabled={isLoading || !firstVariant?.availableForSale}
                className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg"
              >
                <ShoppingCart className="w-5 h-5" />
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 bg-background text-foreground rounded-full flex items-center justify-center shadow-lg"
              >
                <Eye className="w-5 h-5" />
              </motion.div>
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
              {node.title}
            </h3>
            <p className="text-lg font-bold text-primary mt-1">
              {formatPrice(node.priceRange.minVariantPrice.amount, node.priceRange.minVariantPrice.currencyCode)}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}