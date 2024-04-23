import React, { useState, createContext, useContext } from "react";

const ShopContext = createContext();

export function useShopContext() {
  return useContext(ShopContext);
}

export function ShopContextProvider({ children }) {
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(false);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1, // Check if item exists, if not default to 0
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] > 0 ? prev[itemId] - 1 : 0 // Ensure item quantity doesn't go below 0
    }));
  };

  const value = {
    addToCart,
    removeFromCart,
    cartItems,
  };
  return (
    <ShopContext.Provider value={value}>
      {!loading && children}
    </ShopContext.Provider>
  );
}
