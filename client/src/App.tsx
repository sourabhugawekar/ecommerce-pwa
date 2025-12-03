import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { SignupPage } from '@/pages/SignupPage';
import { SigninPage } from '@/pages/SigninPage';
import { BabyProfilePage } from '@/pages/BabyProfilePage';
import { BabyDashboardPage } from '@/pages/BabyDashboardPage';
import { CartPage } from '@/pages/CartPage';
import { OrderConfirmationPage } from '@/pages/OrderConfirmationPage';
import { AdminLayout } from '@/pages/admin/AdminLayout';
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { AdminProducts } from '@/pages/admin/AdminProducts';
import { AdminBundles } from '@/pages/admin/AdminBundles';
import { AdminTips } from '@/pages/admin/AdminTips';
import { AdminUsers } from '@/pages/admin/AdminUsers';
import { AdminOrders } from '@/pages/admin/AdminOrders';
import { ProtectedRoute } from '@/components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <BabyProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/baby-dashboard"
        element={
          <ProtectedRoute>
            <BabyDashboardPage />
          </ProtectedRoute>
        }
      />
      
      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="bundles" element={<AdminBundles />} />
        <Route path="tips" element={<AdminTips />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="orders" element={<AdminOrders />} />
      </Route>
    </Routes>
  );
}

export default App;
