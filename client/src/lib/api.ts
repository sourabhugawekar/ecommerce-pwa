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
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  error?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
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

      console.log('Fetching products from:', response);
      
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
  }
};
