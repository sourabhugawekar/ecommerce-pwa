import { Link, useLocation } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, Home } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useEffect } from 'react';
import { useCart } from '@/hooks/useCart';

export const OrderConfirmationPage = () => {
  const location = useLocation();
  const { clearCart } = useCart();
  const { items = [], total = 0 } = location.state || {};

  // Clear cart on confirmation
  useEffect(() => {
    if (items.length > 0) {
      clearCart();
    }
  }, []);

  const orderNumber = `BB${Date.now().toString().slice(-8)}`;
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Header cartItemCount={0} />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Confirmed! 🎉</h1>
            <p className="text-lg text-gray-600">
              Thank you for shopping at BabyBliss!
            </p>
          </div>

          {/* Order Details Card */}
          <Card className="mb-6 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between items-center pb-4 border-b">
                <div>
                  <p className="text-sm text-gray-500">Order Number</p>
                  <p className="text-xl font-bold text-gray-900">{orderNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Estimated Delivery</p>
                  <p className="font-semibold text-gray-900">{estimatedDelivery}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3">
                <p className="font-semibold text-gray-700">Items Ordered:</p>
                {items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover rounded" />
                        ) : (
                          <span className="text-2xl">{item.emoji || '🍼'}</span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="pt-4 border-t-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-700">Order Total</span>
                  <span className="text-2xl font-bold text-pink-600">₹{total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Demo Notice */}
          <Card className="mb-6 bg-blue-50 border-blue-200">
            <CardContent className="pt-4">
              <p className="text-sm text-blue-800">
                <strong>📌 Demo Mode:</strong> This is a demonstration order. No actual payment was processed and no products will be shipped. This is part of the BabyBliss demo experience.
              </p>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/" className="flex-1">
              <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                <Home className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            <Link to="/baby-dashboard" className="flex-1">
              <Button variant="outline" className="w-full">
                View Baby Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
