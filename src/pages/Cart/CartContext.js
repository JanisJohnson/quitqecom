// src/pages/Cart/CartContext.js
import { createContext, useContext, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        if (existing.quantity < (product.stock ?? 0)) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return prev;
      } else {
        return [...prev, { ...product, quantity: 1, stock: product.stock ?? 0 }];
      }
    });
  };

  const updateCartItemQuantity = (id, newQuantity) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
        .filter((item) => item.quantity > 0) // Remove if quantity becomes 0
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateCartItemQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
