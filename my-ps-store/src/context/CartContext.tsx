'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product: any) => {
    setCart((prev: any) => {
      const existing = prev.find((item: any) => item._id === product._id);
      if (existing) {
        return prev.map((item: any) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item: any) => item._id !== id));
  };

  const totalPrice = cart.reduce((acc, item: any) => acc + item.price * item.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
