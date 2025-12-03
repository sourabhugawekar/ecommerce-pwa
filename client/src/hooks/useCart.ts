import { useState, useCallback, useEffect } from 'react';

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  emoji?: string;
  category?: string;
  imageUrl?: string;
}

const CART_STORAGE_KEY = 'babybliss_cart';

// Load cart from localStorage
const loadCart = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return [];
  }
};

// Save cart to localStorage
const saveCart = (items: CartItem[]) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  // Sync to localStorage whenever items change
  useEffect(() => {
    saveCart(items);
  }, [items]);

  const addToCart = useCallback((product: { 
    _id: string; 
    name: string; 
    price: number; 
    emoji?: string;
    category?: string;
    imageUrl?: string;
  }) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(item => item._id === product._id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevItems, {
        _id: product._id,
        name: product.name,
        price: product.price,
        emoji: product.emoji,
        category: product.category,
        imageUrl: product.imageUrl,
        quantity: 1
      }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prevItems) => prevItems.filter(item => item._id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems((prevItems) =>
      prevItems.map(item =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  };
}
