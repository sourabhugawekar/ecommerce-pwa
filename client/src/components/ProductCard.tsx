import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Product } from '@/lib/api';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
    >
      <Card className="h-full flex flex-col hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
        {/* Wishlist Button */}
        <motion.button
          className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur rounded-full p-2 shadow-md"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleWishlist}
        >
          <Heart 
            className={`h-5 w-5 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
          />
        </motion.button>

        <CardHeader>
          {/* Product emoji/image */}
          <motion.div
            className="w-full h-32 flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg mb-4 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <motion.span
              className="text-6xl"
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {product.emoji || '🍼'}
            </motion.span>
          </motion.div>

          {/* Badge */}
          {product.badge && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <Badge className="w-fit mb-2 shadow-sm" variant="secondary">
                {product.badge}
              </Badge>
            </motion.div>
          )}

          <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
        </CardHeader>

        <CardContent className="flex-grow">
          <CardDescription className="mb-3 line-clamp-2">
            {product.tagline || 'Premium quality product for your baby'}
          </CardDescription>
          
          <div className="flex items-center gap-2">
            <motion.span
              className="text-2xl font-bold text-primary"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              ₹{product.price}
            </motion.span>
            {product.inStock ? (
              <span className="text-xs text-green-600 font-medium">In Stock</span>
            ) : (
              <span className="text-xs text-red-600 font-medium">Out of Stock</span>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <motion.div
            className="w-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              className="w-full gap-2 shadow-md hover:shadow-lg transition-shadow" 
              onClick={() => onAddToCart(product)}
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
          </motion.div>
        </CardFooter>

        {/* Hover overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </Card>
    </motion.div>
  );
}
