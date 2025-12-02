import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { CategoryGrid } from '@/components/CategoryGrid';
import { ProductGrid } from '@/components/ProductGrid';
import { Testimonials } from '@/components/Testimonials';
import { Footer } from '@/components/Footer';
import { useCart } from '@/hooks/useCart';
import type { Product } from '@/lib/api';

function App() {
  const { addToCart, totalItems } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Register service worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('✅ Service Worker registered:', registration);
        })
        .catch((error) => {
          console.error('❌ Service Worker registration failed:', error);
        });
    }
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setToastMessage(`Added ${product.name} to cart!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemCount={totalItems} />
      
      <main className="flex-grow">
        <Hero />
        <CategoryGrid />
        <ProductGrid onAddToCart={handleAddToCart} />
        <Testimonials />
      </main>

      <Footer />

      {/* Simple Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-in slide-in-from-bottom-5 z-50">
          <p className="font-medium">{toastMessage}</p>
        </div>
      )}
    </div>
  );
}

export default App;
