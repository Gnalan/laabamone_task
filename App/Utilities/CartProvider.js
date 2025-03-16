import React, { createContext, useState } from "react";
export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState([]);
  return (
    <CartContext.Provider value={{ cartCount, setCartCount}}>
      {children}
    </CartContext.Provider>
  );
};
