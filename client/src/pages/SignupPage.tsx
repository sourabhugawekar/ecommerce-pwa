import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

export const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    role: 'user' as 'user' | 'admin'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      await signup(
        formData.name,
        formData.email,
        formData.password,
        formData.phoneNumber || undefined
      );
      
      // Role-based redirect
      if (formData.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/baby-dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        
        <Card className="shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Welcome to BabyBliss 🎀
            </CardTitle>
            <CardDescription className="text-base">
              Create your account to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Parent Name *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>I am a *</Label>
                <div className="flex gap-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="user"
                      checked={formData.role === 'user'}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value as 'user' | 'admin' })}
                      className="w-4 h-4 text-pink-500 focus:ring-pink-500"
                    />
                    <span className="text-sm font-medium">Parent</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="admin"
                      checked={formData.role === 'admin'}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value as 'user' | 'admin' })}
                      className="w-4 h-4 text-purple-500 focus:ring-purple-500"
                    />
                    <span className="text-sm font-medium">Admin</span>
                  </label>
                </div>
                <p className="text-xs text-gray-500">
                  Choose Admin for demo access to dashboard
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/signin" className="text-pink-500 hover:text-pink-600 font-medium">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
