import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Package, 
  Tags, 
  Lightbulb, 
  Users, 
  ShoppingCart, 
  LogOut,
  LayoutDashboard 
} from 'lucide-react';

export const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { path: '/admin/products', icon: Package, label: 'Products' },
    { path: '/admin/bundles', icon: Tags, label: 'Bundles' },
    { path: '/admin/tips', icon: Lightbulb, label: 'Tips' },
    { path: '/admin/users', icon: Users, label: 'Users' },
    { path: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
  ];

  const isActive = (path: string, exact: boolean = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">👶</span>
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              BabyBliss Admin
            </h1>
          </Link>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path, item.exact);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  active
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t">
          <Link to="/" className="block mb-2">
            <Button variant="outline" className="w-full justify-start gap-2">
              <Home className="h-4 w-4" />
              Back to Store
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
