import { Bundle } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Tag } from 'lucide-react';

interface BundleCardProps {
  bundle: Bundle;
  onAddToCart?: (bundle: Bundle) => void;
}

export const BundleCard = ({ bundle, onAddToCart }: BundleCardProps) => {
  const discount = bundle.discount || 0;
  const savings = bundle.originalPrice && bundle.bundlePrice 
    ? bundle.originalPrice - bundle.bundlePrice 
    : 0;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="pb-4">
        <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
          <img
            src={bundle.imageUrl || 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=300&fit=crop'}
            alt={bundle.name}
            className="w-full h-full object-cover"
          />
          {discount > 0 && (
            <Badge className="absolute top-2 right-2 bg-red-500 text-white">
              {discount}% OFF
            </Badge>
          )}
          <Badge className="absolute top-2 left-2 bg-purple-500 text-white">
            <Tag className="h-3 w-3 mr-1" />
            Bundle
          </Badge>
        </div>
        <CardTitle className="text-xl">{bundle.name}</CardTitle>
        <CardDescription className="line-clamp-2">{bundle.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            Includes {bundle.productIds?.length || 0} products
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-pink-600">₹{bundle.bundlePrice}</span>
            {bundle.originalPrice && (
              <span className="text-lg text-gray-400 line-through">₹{bundle.originalPrice}</span>
            )}
          </div>
          {savings > 0 && (
            <p className="text-sm text-green-600 font-medium">
              Save ₹{savings.toFixed(2)}!
            </p>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          onClick={() => onAddToCart?.(bundle)}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add Bundle to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
