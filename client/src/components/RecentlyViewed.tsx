import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { Card, CardContent } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';

export const RecentlyViewed = () => {
  const { recentProducts } = useRecentlyViewed();
  const { addToCart } = useCart();

  if (recentProducts.length === 0) {
    return null;
  }

  return (
    <div className="my-8">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-gray-600" />
        <h2 className="text-2xl font-bold text-gray-900">Recently Viewed</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {recentProducts.map((product) => (
          <Card key={product._id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-4xl">{product.emoji || '🍼'}</span>
                )}
              </div>
              <h3 className="font-semibold text-sm mb-1 line-clamp-2">{product.name}</h3>
              <p className="text-xs text-gray-500 capitalize mb-2">{product.category}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-pink-600">₹{product.price.toFixed(2)}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => addToCart(product)}
                  className="text-xs h-7"
                >
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
