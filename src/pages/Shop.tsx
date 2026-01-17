import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { Loader2, SlidersHorizontal, Grid3X3, LayoutGrid, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Product categories based on your Shopify products
const categories = [
  { id: "all", name: "All Products" },
  { id: "resin-art", name: "Resin Art" },
  { id: "engraved", name: "Engraved Items" },
  { id: "frames", name: "Frames & Art" },
  { id: "bottles", name: "Water Bottles" },
  { id: "keychains", name: "Keychains" },
  { id: "custom", name: "Custom Gifts" },
];

const Shop = () => {
  const { data: products, isLoading, error } = useProducts(50);
  const [sortBy, setSortBy] = useState("featured");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [gridSize, setGridSize] = useState<3 | 4>(4);

  // Filter products by category (based on title/tags)
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (selectedCategory === "all") return products;
    
    return products.filter(product => {
      const title = product.node.title.toLowerCase();
      const description = product.node.description?.toLowerCase() || "";
      
      switch (selectedCategory) {
        case "resin-art":
          return title.includes("resin") || description.includes("resin");
        case "engraved":
          return title.includes("engrav") || description.includes("engrav");
        case "frames":
          return title.includes("frame") || title.includes("art") || description.includes("frame");
        case "bottles":
          return title.includes("bottle") || title.includes("tumbler") || description.includes("bottle");
        case "keychains":
          return title.includes("keychain") || title.includes("key chain") || description.includes("keychain");
        case "custom":
          return title.includes("custom") || description.includes("personalized");
        default:
          return true;
      }
    });
  }, [products, selectedCategory]);

  // Sort products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return parseFloat(a.node.priceRange.minVariantPrice.amount) - parseFloat(b.node.priceRange.minVariantPrice.amount);
        case "price-high":
          return parseFloat(b.node.priceRange.minVariantPrice.amount) - parseFloat(a.node.priceRange.minVariantPrice.amount);
        case "name-az":
          return a.node.title.localeCompare(b.node.title);
        case "name-za":
          return b.node.title.localeCompare(a.node.title);
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            Shop All Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Discover our collection of handcrafted, personalized luxury gifts
          </motion.p>
        </div>
      </section>

      {/* Category Pills */}
      <section className="py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <p className="text-muted-foreground">
                {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''}
              </p>
              {selectedCategory !== "all" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCategory("all")}
                  className="text-primary"
                >
                  <X className="w-3 h-3 mr-1" />
                  Clear filter
                </Button>
              )}
            </div>
            <div className="flex items-center gap-4">
              {/* Grid Toggle */}
              <div className="hidden md:flex items-center gap-1 border border-border rounded-lg p-1">
                <button
                  onClick={() => setGridSize(3)}
                  className={`p-2 rounded ${gridSize === 3 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridSize(4)}
                  className={`p-2 rounded ${gridSize === 4 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
              </div>
              
              {/* Sort */}
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Featured" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name-az">Name: A to Z</SelectItem>
                  <SelectItem value="name-za">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-destructive mb-4">Failed to load products</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg mb-4">No products found in this category</p>
              <Button variant="outline" onClick={() => setSelectedCategory("all")}>
                View All Products
              </Button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                gridSize === 3 ? "lg:grid-cols-3" : "lg:grid-cols-3 xl:grid-cols-4"
              } gap-6`}
            >
              {sortedProducts.map((product, index) => (
                <ProductCard key={product.node.id} product={product} index={index} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
