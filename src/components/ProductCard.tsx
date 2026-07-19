import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, ClipboardPlus, Check } from 'lucide-react';
import { LocalProduct, formatPrice } from '@/data/products';
import { useEnquiryStore } from '@/stores/enquiryStore';
import { useState } from 'react';

interface ProductCardProps {
  product: LocalProduct;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useEnquiryStore(s => s.addItem);
  const items = useEnquiryStore(s => s.items);
  const isInList = items.some(i => i.product.id === product.id);
  const [added, setAdded] = useState(false);

  const handleAddToEnquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/product/${product.handle}`} className="group block">
        <div className="product-card bg-card border border-border overflow-hidden">
          <div className="relative aspect-square overflow-hidden bg-muted flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-secondary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToEnquiry}
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg cursor-pointer ${
                  added || isInList
                    ? 'bg-green-500 text-white'
                    : 'bg-primary text-primary-foreground'
                }`}
              >
                {added || isInList ? <Check className="w-5 h-5" /> : <ClipboardPlus className="w-5 h-5" />}
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
              {product.title}
            </h3>
            <p className="text-lg font-bold text-primary mt-1">
              {formatPrice(product.price, product.currencyCode)}
            </p>
            <button
              onClick={handleAddToEnquiry}
              className={`inline-flex items-center gap-1.5 mt-3 text-xs font-medium transition-colors cursor-pointer bg-transparent border-none ${
                added || isInList ? 'text-green-500' : 'text-muted-foreground hover:text-primary'
              }`}
            >
              {added || isInList ? (
                <><Check className="w-3.5 h-3.5" /> Added to Enquiry</>
              ) : (
                <><ClipboardPlus className="w-3.5 h-3.5" /> Add to Enquiry</>
              )}
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
