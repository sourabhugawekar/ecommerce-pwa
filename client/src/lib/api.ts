export interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  badge?: string;
  tagline?: string;
  imageUrl?: string;
  emoji?: string;
  inStock: boolean;
  ageRange?: string;
  stockCount?: number;
  description?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  phoneNumber?: string;
  favorites?: string[];
  createdAt?: string;
}

export interface Baby {
  _id: string;
  userId: string;
  babyName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  weight?: number;
  height?: number;
  skinType?: 'sensitive' | 'normal' | 'dry' | 'combination';
  allergyNote?: string;
  ageInMonths?: number;
}

export interface Bundle {
  _id: string;
  name: string;
  description: string;
  productIds: Product[];
  bundlePrice: number;
  originalPrice?: number;
  discount?: number;
  imageUrl?: string;
  ageRange: string;
  isActive: boolean;
}

export interface Tip {
  _id: string;
  title: string;
  body: string;
  ageRange: string;
  category: string;
  isActive: boolean;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  shippingAddress?: ShippingAddress;
  paymentMethod?: string;
  orderDate?: string;
  createdAt?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  error?: string;
  message?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('babybliss_token');
};

// Helper to get auth headers
const getAuthHeaders = (): HeadersInit => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

export const api = {
  // ===== PRODUCTS =====
  async getProducts(category?: string): Promise<Product[]> {
    try {
      const url = category 
        ? `${API_BASE_URL}/products?category=${category}`
        : `${API_BASE_URL}/products`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('⚠️ Backend server not responding with JSON. Is the server running?');
        console.error('Expected API at:', API_BASE_URL);
        throw new Error('Backend server not running. Please start: cd server && npm start');
      }
      
      const result: ApiResponse<Product[]> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch products');
      }
      
      return result.data || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      console.error('💡 Tip: Make sure the backend server is running:');
      console.error('   cd server && npm start');
      return [];
    }
  },

  async getProductById(id: string): Promise<Product | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<Product> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch product');
      }
      
      return result.data || null;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },

  // ===== AUTHENTICATION =====
  async signup(data: { name: string; email: string; password: string; phoneNumber?: string }) {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Signup failed');
    }
    
    return result.data;
  },

  async login(data: { email: string; password: string }) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Login failed');
    }
    
    return result.data;
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: getAuthHeaders(),
      });
      
      if (!response.ok) {
        return null;
      }
      
      const result = await response.json();
      return result.data?.user || null;
    } catch {
      return null;
    }
  },

  async toggleFavorite(productId: string) {
    const response = await fetch(`${API_BASE_URL}/auth/favorites`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ productId }),
    });
    
    const result = await response.json();
    
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to update favorites');
    }
    
    return result.data;
  },

  async getFavorites(): Promise<Product[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/favorites`, {
        headers: getAuthHeaders(),
      });
      
      if (!response.ok) {
        return [];
      }
      
      const result = await response.json();
      return result.data?.favorites || [];
    } catch {
      return [];
    }
  },

  // ===== BABY PROFILE =====
  async createOrUpdateBabyProfile(data: Partial<Baby>) {
    const response = await fetch(`${API_BASE_URL}/babies`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to save baby profile');
    }
    
    return result.data.baby;
  },

  async getBabyProfile(): Promise<Baby | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/babies/me`, {
        headers: getAuthHeaders(),
      });
      
      if (!response.ok) {
        return null;
      }
      
      const result = await response.json();
      return result.data?.baby || null;
    } catch {
      return null;
    }
  },

  // ===== BUNDLES =====
  async getBundles(): Promise<Bundle[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/bundles`);
      const result = await response.json();
      return result.data?.bundles || [];
    } catch {
      return [];
    }
  },

  async getBundlesByAge(ageRange: string): Promise<Bundle[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/bundles/age/${ageRange}`);
      const result = await response.json();
      return result.data?.bundles || [];
    } catch {
      return [];
    }
  },

  // ===== TIPS =====
  async getTips(ageRange?: string, category?: string): Promise<Tip[]> {
    try {
      const params = new URLSearchParams();
      if (ageRange) params.append('ageRange', ageRange);
      if (category) params.append('category', category);
      
      const response = await fetch(`${API_BASE_URL}/tips?${params}`);
      const result = await response.json();
      return result.data?.tips || [];
    } catch {
      return [];
    }
  },

  async getRandomTip(ageRange?: string): Promise<Tip | null> {
    try {
      const params = ageRange ? `?ageRange=${ageRange}` : '';
      const response = await fetch(`${API_BASE_URL}/tips/random${params}`);
      const result = await response.json();
      return result.data?.tip || null;
    } catch {
      return null;
    }
  },

  // ===== ORDERS =====
  async createOrder(data: { items: OrderItem[]; totalAmount: number; shippingAddress?: ShippingAddress; paymentMethod?: string }) {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to create order');
    }
    
    return result.data.order;
  },

  async getUserOrders(): Promise<Order[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        headers: getAuthHeaders(),
      });
      
      if (!response.ok) {
        return [];
      }
      
      const result = await response.json();
      return result.data?.orders || [];
    } catch {
      return [];
    }
  },

  // ===== ADMIN =====
  async getAdminStats() {
    const response = await fetch(`${API_BASE_URL}/admin/stats`, {
      headers: getAuthHeaders(),
    });
    
    const result = await response.json();
    
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to fetch stats');
    }
    
    return result.data.stats;
  },

  async getAllProductsAdmin(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/admin/products`, {
      headers: getAuthHeaders(),
    });
    const result = await response.json();
    return result.data?.products || [];
  },

  async createProduct(data: Partial<Product>) {
    const response = await fetch(`${API_BASE_URL}/admin/products`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to create product');
    }
    return result.data.product;
  },

  async updateProduct(id: string, data: Partial<Product>) {
    const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to update product');
    }
    return result.data.product;
  },

  async deleteProduct(id: string) {
    const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to delete product');
    }
  },

  async getAllBundlesAdmin(): Promise<Bundle[]> {
    const response = await fetch(`${API_BASE_URL}/admin/bundles`, {
      headers: getAuthHeaders(),
    });
    const result = await response.json();
    return result.data?.bundles || [];
  },

  async createBundle(data: Partial<Bundle>) {
    const response = await fetch(`${API_BASE_URL}/admin/bundles`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to create bundle');
    }
    return result.data.bundle;
  },

  async updateBundle(id: string, data: Partial<Bundle>) {
    const response = await fetch(`${API_BASE_URL}/admin/bundles/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to update bundle');
    }
    return result.data.bundle;
  },

  async deleteBundle(id: string) {
    const response = await fetch(`${API_BASE_URL}/admin/bundles/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to delete bundle');
    }
  },

  async getAllTipsAdmin(): Promise<Tip[]> {
    const response = await fetch(`${API_BASE_URL}/admin/tips`, {
      headers: getAuthHeaders(),
    });
    const result = await response.json();
    return result.data?.tips || [];
  },

  async createTip(data: Partial<Tip>) {
    const response = await fetch(`${API_BASE_URL}/admin/tips`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to create tip');
    }
    return result.data.tip;
  },

  async updateTip(id: string, data: Partial<Tip>) {
    const response = await fetch(`${API_BASE_URL}/admin/tips/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to update tip');
    }
    return result.data.tip;
  },

  async deleteTip(id: string) {
    const response = await fetch(`${API_BASE_URL}/admin/tips/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to delete tip');
    }
  },

  async getAllUsers(): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/admin/users`, {
      headers: getAuthHeaders(),
    });
    const result = await response.json();
    return result.data?.users || [];
  },

  async getAllOrders(): Promise<Order[]> {
    const response = await fetch(`${API_BASE_URL}/admin/orders`, {
      headers: getAuthHeaders(),
    });
    const result = await response.json();
    return result.data?.orders || [];
  },

  async updateOrderStatus(id: string, status: string) {
    const response = await fetch(`${API_BASE_URL}/admin/orders/${id}/status`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to update order status');
    }
    return result.data.order;
  },
};

// Convenient named exports for different API sections
export const productApi = {
  getAllProducts: api.getProducts,
  getProductById: api.getProductById,
};

export const babyApi = {
  createOrUpdateBabyProfile: api.createOrUpdateBabyProfile,
  getBabyProfile: api.getBabyProfile,
};

export const bundleApi = {
  getBundles: api.getBundles,
};

export const tipApi = {
  getTips: api.getTips,
  getRandomTip: api.getRandomTip,
};

export const orderApi = {
  createOrder: api.createOrder,
  getUserOrders: api.getUserOrders,
};

export const adminApi = {
  getDashboardStats: api.getAdminStats,
  getAllProducts: api.getProducts,
  createProduct: api.createProduct,
  updateProduct: api.updateProduct,
  deleteProduct: api.deleteProduct,
  getAllBundles: api.getBundles,
  createBundle: api.createBundle,
  updateBundle: api.updateBundle,
  deleteBundle: api.deleteBundle,
  getAllTips: api.getTips,
  createTip: api.createTip,
  updateTip: api.updateTip,
  deleteTip: api.deleteTip,
  getAllUsers: api.getAllUsers,
  getAllOrders: api.getAllOrders,
  updateOrderStatus: api.updateOrderStatus,
};

