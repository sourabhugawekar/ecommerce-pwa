import { Link } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus, ShoppingBag, Tag } from 'lucide-react';
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const CartPage = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  const FREE_SHIPPING_THRESHOLD = 1500;
  const shippingProgress = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - totalPrice, 0);

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'BABY10') {
      setDiscount(10);
      setPromoApplied(true);
    } else if (promoCode.toUpperCase() === 'BABY20') {
      setDiscount(20);
      setPromoApplied(true);
    } else {
      alert('Invalid promo code');
    }
  };

  const discountedTotal = totalPrice - (totalPrice * discount / 100);
  const finalTotal = discountedTotal;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header cartItemCount={totalItems} />
        <main className="flex-grow flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 p-4">
          <Card className="max-w-md w-full text-center shadow-xl">
            <CardContent className="pt-12 pb-8">
              <div className="mb-6">
                <ShoppingBag className="h-24 w-24 mx-auto text-gray-300" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Your Cart is Empty</h2>
              <p className="text-gray-600 mb-6">
                Explore our best sellers and add something special for your little one!
              </p>
              <Link to="/">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-500">
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header cartItemCount={totalItems} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600">{totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        {/* Free Shipping Progress */}
        {remainingForFreeShipping > 0 && (
          <Card className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-green-800">
                  Add ₹{remainingForFreeShipping.toFixed(2)} more for FREE shipping!
                </p>
                <p className="text-xs text-green-600">{shippingProgress.toFixed(0)}%</p>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {shippingProgress >= 100 && (
          <Card className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="pt-4">
              <p className="text-sm font-medium text-green-800 flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Congratulations! You've unlocked FREE shipping! 🎉
              </p>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item._id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <span className="text-4xl">{item.emoji || '🍼'}</span>
                      )}
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                      <div className="mt-2 flex items-center gap-4">
                        <div className="flex items-center gap-2 border rounded-lg">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-gray-500">₹{item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                    <span className="font-medium">₹{totalPrice.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount ({discount}%)</span>
                      <span>- ₹{(totalPrice * discount / 100).toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">
                      {shippingProgress >= 100 ? 'FREE' : '₹50'}
                    </span>
                  </div>

                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-lg">Total</span>
                      <span className="font-bold text-xl text-pink-600">
                        ₹{(finalTotal + (shippingProgress >= 100 ? 0 : 50)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Promo Code</span>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                      className="flex-grow"
                    />
                    <Button
                      variant="outline"
                      onClick={handleApplyPromo}
                      disabled={promoApplied || !promoCode}
                    >
                      Apply
                    </Button>
                  </div>
                  {promoApplied && (
                    <p className="text-xs text-green-600 mt-1">Promo code applied! 🎉</p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">Try: BABY10 or BABY20</p>
                </div>

                <Link to="/order-confirmation" state={{ items, total: finalTotal + (shippingProgress >= 100 ? 0 : 50) }}>
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                    Proceed to Demo Checkout
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    if (confirm('Clear all items from cart?')) {
                      clearCart();
                    }
                  }}
                >
                  Clear Cart
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
