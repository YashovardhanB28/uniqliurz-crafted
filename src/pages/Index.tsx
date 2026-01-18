import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, Package, Truck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';

const Index = () => {
  const { data: products, isLoading } = useProducts(8);

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center section-dark overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsla(16,76%,49%,0.1),transparent_50%)]" />
        
        <div className="container mx-auto px-4 pt-20 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.span
              className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              ✨ Handcrafted with Love
            </motion.span>
            
            <h1 className="heading-hero text-hero-text mb-6">
              <span className="block">Your Imagination,</span>
              <span className="text-primary">Our Craftsmanship</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-hero-text/70 max-w-2xl mx-auto mb-10">
              Handcrafted Luxury Gifts, Personalized Perfectly
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop">
                <motion.button
                  className="btn-hero"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore Collection
                </motion.button>
              </Link>
              <Link to="/customize">
                <motion.button
                  className="btn-hero-outline text-hero-text border-hero-text/30 hover:border-primary"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Custom Order
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* Brand Story */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-section text-foreground mb-4">Where Every Creation Tells a Story</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              At UNIQLIURZ, we transform your ideas into tangible treasures. Each piece is meticulously handcrafted with premium materials and unwavering attention to detail.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-section text-foreground mb-4">Bestselling Creations</h2>
            <p className="text-muted-foreground">Discover our most loved handcrafted gifts</p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="skeleton h-80 rounded-lg" />
              ))}
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 8).map((product, index) => (
                <ProductCard key={product.node.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">No products found</div>
          )}

          <div className="text-center mt-12">
            <Link to="/shop">
              <motion.button className="btn-primary rounded-lg" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                View All Products
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="heading-section text-foreground text-center mb-16"
          >
            How It Works
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Sparkles, title: 'Choose', desc: 'Select your base product' },
              { icon: Heart, title: 'Customize', desc: 'Add your personal touch' },
              { icon: Package, title: 'We Craft', desc: 'Handmade with love' },
              { icon: Truck, title: 'Deliver', desc: 'Safe delivery to you' },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <span className="text-3xl font-bold text-primary">{i + 1}</span>
                <h3 className="text-xl font-semibold mt-2 mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 section-dark">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="heading-section text-hero-text mb-4">Ready to Create Something Special?</h2>
            <p className="text-hero-text/70 mb-8 max-w-xl mx-auto">
              Join thousands of happy customers who've made their moments unforgettable
            </p>
            <Link to="/shop">
              <motion.button className="btn-hero" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                Start Shopping
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;