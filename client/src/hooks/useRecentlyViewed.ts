import { useState, useEffect, useCallback } from 'react';

export interface RecentProduct {
  _id: string;
  name: string;
  price: number;
  category: string;
  emoji?: string;
  imageUrl?: string;
}

const STORAGE_KEY = 'babybliss_recent_products';
const MAX_RECENT = 5;

const loadRecentProducts = (): RecentProduct[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading recent products:', error);
    return [];
  }
};

const saveRecentProducts = (products: RecentProduct[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error('Error saving recent products:', error);
  }
};

export function useRecentlyViewed() {
  const [recentProducts, setRecentProducts] = useState<RecentProduct[]>(loadRecentProducts);

  useEffect(() => {
    saveRecentProducts(recentProducts);
  }, [recentProducts]);

  const addRecentProduct = useCallback((product: RecentProduct) => {
    setRecentProducts((prev) => {
      // Remove if already exists
      const filtered = prev.filter(p => p._id !== product._id);
      
      // Add to front and limit to MAX_RECENT
      const updated = [product, ...filtered].slice(0, MAX_RECENT);
      
      return updated;
    });
  }, []);

  const clearRecentProducts = useCallback(() => {
    setRecentProducts([]);
  }, []);

  return {
    recentProducts,
    addRecentProduct,
    clearRecentProducts
  };
}
