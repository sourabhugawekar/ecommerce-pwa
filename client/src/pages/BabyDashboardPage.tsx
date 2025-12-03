import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/contexts/AuthContext';
import { babyApi, productApi, Product } from '@/lib/api';
import { Baby, Calendar, Ruler, Weight, AlertCircle, ShoppingCart } from 'lucide-react';
import { MilestoneChecklist } from '@/components/MilestoneChecklist';
import { RecentlyViewed } from '@/components/RecentlyViewed';

interface BabyProfile {
  _id: string;
  babyName: string;
  dateOfBirth: string;
  gender: string;
  weight?: number;
  height?: number;
  skinType?: string;
  allergyNote?: string;
  ageInMonths?: number;
}

export const BabyDashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { totalItems, addToCart } = useCart();
  const [babyProfile, setBabyProfile] = useState<BabyProfile | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBabyProfile();
  }, []);

  useEffect(() => {
    if (babyProfile?.ageInMonths !== undefined) {
      fetchRecommendedProducts();
    }
  }, [babyProfile]);

  const fetchBabyProfile = async () => {
    try {
      setLoading(true);
      const data = await babyApi.getBabyProfile();
      setBabyProfile(data);
    } catch (error) {
      console.error('Error fetching baby profile:', error);
      // Profile doesn't exist yet
      setBabyProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendedProducts = async () => {
    try {
      const allProducts = await productApi.getAllProducts();
      
      // Filter products by age range if baby profile exists
      if (babyProfile?.ageInMonths !== undefined) {
        const ageInMonths = babyProfile.ageInMonths;
        const filtered = allProducts.filter((product: Product) => {
          if (!product.ageRange) return false;
          
          // Parse age range like "0-6 months", "1-2 years"
          const match = product.ageRange.match(/(\d+)-(\d+)\s*(months|years)/);
          if (!match) return false;
          
          const [, min, max, unit] = match;
          const minMonths = unit === 'years' ? parseInt(min) * 12 : parseInt(min);
          const maxMonths = unit === 'years' ? parseInt(max) * 12 : parseInt(max);
          
          return ageInMonths >= minMonths && ageInMonths <= maxMonths;
        });
        
        setRecommendedProducts(filtered.slice(0, 6));
      }
    } catch (error) {
      console.error('Error fetching recommended products:', error);
    }
  };

  const convertAgeToRange = (ageInMonths: number): string => {
    if (ageInMonths < 3) return '0-3 months';
    if (ageInMonths < 6) return '3-6 months';
    return '6-12 months';
  };

  const calculateAge = (dateOfBirth: string) => {
    const birth = new Date(dateOfBirth);
    const now = new Date();
    const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
    
    if (months < 12) {
      return `${months} months`;
    } else {
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      return remainingMonths > 0 ? `${years} years ${remainingMonths} months` : `${years} years`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header cartItemCount={totalItems} />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-gray-600">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  // Show onboarding if no profile
  if (!babyProfile) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <Header cartItemCount={totalItems} />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-xl">
              <CardContent className="pt-12 pb-8 text-center">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-pink-100 rounded-full mb-4">
                    <Baby className="h-10 w-10 text-pink-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">Welcome to Your Baby Dashboard!</h2>
                  <p className="text-gray-600 mb-6">
                    Create your baby's profile to unlock personalized product recommendations, milestones tracking, and parenting tips tailored to your little one's age.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <Button
                    onClick={() => navigate('/profile')}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  >
                    Create Baby Profile
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/')} className="w-full">
                    Browse Products First
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header cartItemCount={totalItems} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Hi {user?.name}! 👋
          </h1>
          <p className="text-gray-600">
            Here's everything for {babyProfile.babyName}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Baby Summary Card */}
          <Card className="lg:col-span-2 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
              <CardTitle className="flex items-center gap-2">
                <Baby className="h-5 w-5 text-pink-600" />
                {babyProfile.babyName}'s Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Age</p>
                    <p className="font-semibold">{calculateAge(babyProfile.dateOfBirth)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Baby className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Gender</p>
                    <p className="font-semibold capitalize">{babyProfile.gender}</p>
                  </div>
                </div>

                {babyProfile.weight && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Weight className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Weight</p>
                      <p className="font-semibold">{babyProfile.weight} kg</p>
                    </div>
                  </div>
                )}

                {babyProfile.height && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Ruler className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Height</p>
                      <p className="font-semibold">{babyProfile.height} cm</p>
                    </div>
                  </div>
                )}
              </div>

              {babyProfile.allergyNote && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-yellow-800">Allergy Note</p>
                    <p className="text-sm text-yellow-700">{babyProfile.allergyNote}</p>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <Button variant="outline" onClick={() => navigate('/profile')} className="w-full sm:w-auto">
                  Update Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="shadow-lg bg-gradient-to-br from-pink-500 to-purple-600 text-white">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Age-Appropriate Products</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-3xl font-bold">{recommendedProducts.length}</p>
                  <p className="text-pink-100">Recommended for you</p>
                </div>
                <div className="pt-4 border-t border-pink-300">
                  <p className="text-sm text-pink-100">
                    Based on {babyProfile.babyName}'s age of {babyProfile.ageInMonths} months
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Recommended for {babyProfile.babyName}</h2>
                <p className="text-gray-600">Age-appropriate products curated just for you</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedProducts.map((product) => (
                <Card key={product._id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <span className="text-6xl">{product.emoji || '🍼'}</span>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-gray-500 capitalize mb-3">{product.category}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-pink-600">₹{product.price.toFixed(2)}</span>
                      <Button
                        size="sm"
                        onClick={() => addToCart(product)}
                        className="gap-2"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Milestones */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Developmental Milestones</h2>
          <MilestoneChecklist ageRange={convertAgeToRange(babyProfile.ageInMonths || 0)} />
        </div>

        {/* Recently Viewed */}
        <RecentlyViewed />

      </main>

      <Footer />
    </div>
  );
};
