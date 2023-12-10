// CartWidget.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsCart } from 'react-icons/bs';
import { CartContext } from '../contexts/CartContext';

const CartWidget = () => {
  const { cartItems } = useContext(CartContext);

  // Calcula la cantidad total de items en el carrito
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link to="/cart">
      <BsCart size={30} />
      {/* Utiliza el número calculado de elementos en el carrito */}
      {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
    </Link>
  );
};

export default CartWidget;