import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

export const SigninPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);

    try {
      const userData = await login(formData.email, formData.password);
      
      // Role-based redirect
      if (userData && userData.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/baby-dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
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
              Welcome Back 🎀
            </CardTitle>
            <CardDescription className="text-base">
              Sign in to your BabyBliss account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
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
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
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
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-xs text-blue-800 font-medium mb-1">Demo Accounts:</p>
              <p className="text-xs text-blue-700">👤 User: user@demo.com / password123</p>
              <p className="text-xs text-blue-700">🔧 Admin: admin@demo.com / admin123</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-pink-500 hover:text-pink-600 font-medium">
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
