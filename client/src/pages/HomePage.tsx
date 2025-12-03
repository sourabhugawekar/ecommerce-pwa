import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { api, Product, Bundle, Tip, Baby } from '@/lib/api';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { CategoryGrid } from '@/components/CategoryGrid';
import { ProductGrid } from '@/components/ProductGrid';
import { BundleCard } from '@/components/BundleCard';
import { TipCard } from '@/components/TipCard';
import { MilestoneChecklist } from '@/components/MilestoneChecklist';
import { Testimonials } from '@/components/Testimonials';
import { RecentlyViewed } from '@/components/RecentlyViewed';
import { Footer } from '@/components/Footer';
import { useCart } from '@/hooks/useCart';
import { Sparkles, Package } from 'lucide-react';

export const HomePage = () => {
  const { user, isAuthenticated } = useAuth();
  const { addToCart, totalItems } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [randomTip, setRandomTip] = useState<Tip | null>(null);
  const [babyProfile, setBabyProfile] = useState<Baby | null>(null);

  useEffect(() => {
    // Fetch bundles
    api.getBundles().then(setBundles);

    // Fetch baby profile if authenticated
    if (isAuthenticated) {
      api.getBabyProfile().then(profile => {
        setBabyProfile(profile);
        
        // Fetch age-appropriate tip
        if (profile?.ageInMonths !== undefined) {
          let ageRange = 'all';
          if (profile.ageInMonths <= 3) ageRange = '0-3 months';
          else if (profile.ageInMonths <= 6) ageRange = '3-6 months';
          else if (profile.ageInMonths <= 12) ageRange = '6-12 months';
          else ageRange = '12+ months';
          
          api.getRandomTip(ageRange).then(setRandomTip);
        }
      });
    } else {
      // Get random tip for all ages
      api.getRandomTip().then(setRandomTip);
    }
  }, [isAuthenticated]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setToastMessage(`Added ${product.name} to cart!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleAddBundleToCart = (bundle: Bundle) => {
    // Add all products in bundle to cart
    bundle.productIds.forEach((product: Product) => {
      addToCart(product);
    });
    setToastMessage(`Added ${bundle.name} bundle to cart!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getAgeRange = () => {
    if (!babyProfile?.ageInMonths) return '0-3 months';
    const months = babyProfile.ageInMonths;
    if (months <= 3) return '0-3 months';
    if (months <= 6) return '3-6 months';
    if (months <= 12) return '6-12 months';
    return '12+ months';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemCount={totalItems} />
      
      <main className="flex-grow">
        <Hero />

        {/* Personalized Greeting */}
        {isAuthenticated && babyProfile && (
          <section className="py-8 bg-gradient-to-r from-pink-100 to-purple-100">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="h-6 w-6 text-pink-500" />
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Hi {user?.name}! 👋
                  </h2>
                  <Sparkles className="h-6 w-6 text-pink-500" />
                </div>
                <p className="text-lg text-gray-700">
                  Here's what <span className="font-semibold text-pink-600">{babyProfile.babyName}</span> might need at {' '}
                  <span className="font-semibold text-purple-600">{babyProfile.ageInMonths} months</span> old
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Tip of the Day */}
        {randomTip && (
          <section className="py-8 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
                  <Sparkles className="h-6 w-6 text-yellow-500" />
                  Parenting Tip of the Day
                </h3>
                <TipCard tip={randomTip} />
              </div>
            </div>
          </section>
        )}

        {/* Featured Bundles */}
        {bundles.length > 0 && (
          <section className="py-12 bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="container mx-auto px-4">
              <h3 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
                <Package className="h-8 w-8 text-purple-500" />
                Smart Bundles - Save More!
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {bundles.map(bundle => (
                  <BundleCard
                    key={bundle._id}
                    bundle={bundle}
                    onAddToCart={handleAddBundleToCart}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Milestone Checklist */}
        {isAuthenticated && babyProfile && (
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <MilestoneChecklist ageRange={getAgeRange()} />
              </div>
            </div>
          </section>
        )}

        <CategoryGrid />
        
        <div className="container mx-auto px-4">
          <RecentlyViewed />
        </div>

        <ProductGrid onAddToCart={handleAddToCart} />
        <Testimonials />
      </main>

      <Footer />

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-in slide-in-from-bottom-5 z-50">
          <p className="font-medium">{toastMessage}</p>
        </div>
      )}
    </div>
  );
};
