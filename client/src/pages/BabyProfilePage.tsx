import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const BabyProfilePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    babyName: '',
    dateOfBirth: '',
    gender: 'prefer-not-to-say',
    weight: '',
    height: '',
    skinType: 'normal',
    allergyNote: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }

    const fetchBabyProfile = async () => {
      try {
        const baby = await api.getBabyProfile();
        if (baby) {
          setFormData({
            babyName: baby.babyName,
            dateOfBirth: baby.dateOfBirth.split('T')[0],
            gender: baby.gender,
            weight: baby.weight?.toString() || '',
            height: baby.height?.toString() || '',
            skinType: baby.skinType || 'normal',
            allergyNote: baby.allergyNote || ''
          });
        }
      } catch (err) {
        console.error('Failed to fetch baby profile:', err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchBabyProfile();
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.babyName || !formData.dateOfBirth || !formData.gender) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      await api.createOrUpdateBabyProfile({
        babyName: formData.babyName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender as any,
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
        height: formData.height ? parseFloat(formData.height) : undefined,
        skinType: formData.skinType as any,
        allergyNote: formData.allergyNote
      });

      setSuccess('Baby profile saved successfully! 🎉');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to save baby profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Baby Profile 👶
            </CardTitle>
            <CardDescription className="text-base">
              Tell us about your little one for personalized recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="babyName">Baby's Name *</Label>
                  <Input
                    id="babyName"
                    name="babyName"
                    type="text"
                    placeholder="Emma"
                    value={formData.babyName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => handleSelectChange('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    step="0.1"
                    placeholder="3.5"
                    value={formData.weight}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    step="0.1"
                    placeholder="50"
                    value={formData.height}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skinType">Skin Type</Label>
                <Select value={formData.skinType} onValueChange={(value) => handleSelectChange('skinType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select skin type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="sensitive">Sensitive</SelectItem>
                    <SelectItem value="dry">Dry</SelectItem>
                    <SelectItem value="combination">Combination</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="allergyNote">Allergy Notes (Optional)</Label>
                <textarea
                  id="allergyNote"
                  name="allergyNote"
                  className="w-full min-h-[100px] px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Any allergies or special notes..."
                  value={formData.allergyNote}
                  onChange={handleChange}
                  maxLength={500}
                />
                <p className="text-xs text-gray-500">{formData.allergyNote.length}/500 characters</p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
                  {success}
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Profile'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="px-6"
                >
                  Skip for Now
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
