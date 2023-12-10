// CartContext.js
import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Obtener el carrito del localStorage al cargar la página
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Función para agregar un item al carrito
  const addToCart = (item, quantity) => {
    const newItem = { ...item, quantity };
    setCartItems((prevItems) => [...prevItems, newItem]);

    // Actualizar el localStorage con el nuevo carrito
    localStorage.setItem('cart', JSON.stringify([...cartItems, newItem]));
  };

  // Función para limpiar el carrito
  const clearCart = () => {
    setCartItems([]);

    // Limpiar el localStorage
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };