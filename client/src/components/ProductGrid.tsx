import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ProductCard } from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '@/lib/api';

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
}

const categories = [
  { value: 'all', label: 'All Products' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'diapers-care', label: 'Diapers & Care' },
  { value: 'feeding', label: 'Feeding' },
  { value: 'toys', label: 'Toys' },
  { value: 'nursery', label: 'Nursery' },
  { value: 'bath', label: 'Bath' }
];

export function ProductGrid({ onAddToCart }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { products, loading, error } = useProducts(
    selectedCategory === 'all' ? undefined : selectedCategory
  );

  // Filter products by search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.tagline?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="products" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Best Sellers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most loved products, carefully selected for your little ones
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="max-w-md mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-6 shadow-md focus:shadow-lg transition-shadow"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Tabs 
            value={selectedCategory} 
            onValueChange={setSelectedCategory}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-600">Filter by category:</span>
            </div>
            <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto gap-2 bg-transparent p-0">
              {categories.map((category) => (
                <motion.div
                  key={category.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <TabsTrigger
                    value={category.value}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shadow-sm"
                  >
                    {category.label}
                  </TabsTrigger>
                </motion.div>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Results count */}
        {searchQuery && (
          <motion.p
            className="text-sm text-gray-600 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} matching "{searchQuery}"
          </motion.p>
        )}

        {/* Loading State */}
        {loading && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="inline-block h-12 w-12 rounded-full border-4 border-solid border-primary border-r-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="mt-4 text-gray-600">Loading products...</p>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="text-red-600">Error loading products: {error}</p>
          </motion.div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + searchQuery}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProducts.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="text-gray-600 text-lg">
              {searchQuery 
                ? `No products found matching "${searchQuery}"`
                : "No products found in this category"
              }
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
