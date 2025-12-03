import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Users, Package, ShoppingCart, TrendingUp, Tags, Lightbulb } from 'lucide-react';

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalBundles: 0,
    totalTips: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.getAdminStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'from-purple-500 to-pink-500',
      textColor: 'text-purple-600'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'from-green-500 to-emerald-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Revenue (Demo)',
      value: `₹${stats.totalRevenue.toFixed(2)}`,
      icon: TrendingUp,
      color: 'from-yellow-500 to-orange-500',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Active Bundles',
      value: stats.totalBundles,
      icon: Tags,
      color: 'from-pink-500 to-rose-500',
      textColor: 'text-pink-600'
    },
    {
      title: 'Parenting Tips',
      value: stats.totalTips,
      icon: Lightbulb,
      color: 'from-indigo-500 to-purple-500',
      textColor: 'text-indigo-600'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600">Loading stats...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to BabyBliss Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${stat.textColor}`}>
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Info */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-gray-600">
            <strong>Demo Account:</strong> This is a demonstration admin panel for the BabyBliss PWA assignment.
          </p>
          <p className="text-sm text-gray-600">
            <strong>Features:</strong> Full CRUD operations for products, bundles, tips, view users and orders.
          </p>
          <p className="text-sm text-gray-600">
            <strong>Data:</strong> All data is for demo purposes only. No real transactions are processed.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
