import { motion } from 'framer-motion';
import { useProducts } from '@/hooks/useProducts';

export function ProductBanner() {
  const { data: products, isLoading } = useProducts(12);

  if (isLoading || !products || products.length === 0) {
    return null;
  }

  // Duplicate for seamless infinite scroll
  const allProducts = [...products, ...products];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-secondary/60 z-10" />
      <motion.div
        className="flex gap-6 absolute top-1/2 -translate-y-1/2"
        animate={{
          x: [0, -50 * products.length * 16],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: products.length * 8,
            ease: "linear",
          },
        }}
      >
        {allProducts.map((product, index) => {
          const imageUrl = product.node.images?.edges?.[0]?.node?.url;
          if (!imageUrl) return null;
          
          return (
            <div
              key={`${product.node.id}-${index}`}
              className="w-48 h-64 flex-shrink-0 rounded-xl overflow-hidden opacity-40"
            >
              <img
                src={imageUrl}
                alt={product.node.title}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
