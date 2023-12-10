// Cart.js
import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);

  const handleClearCart = () => {
    // Lógica para limpiar el carrito
    clearCart();
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container mt-4">
      <h2>Carrito de Compras</h2>
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => (
            <div key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>Precio: ${item.price}</p>
              <p>Cantidad: {item.quantity}</p>
              <p>Subtotal: ${item.price * item.quantity}</p>
              <img src={item.imageId} alt={item.title} style={{ maxWidth: '150px' }} />
            </div>
          ))}
          <p>Total: ${calculateTotalPrice()}</p>
          <button>
            <Link to="/checkout">Finalizar Compra</Link>
          </button>
          <button onClick={handleClearCart}>Limpiar Carrito</button>
        </div>
      ) : (
        <p>El carrito está vacío</p>
      )}
    </div>
  );
};

export default CartPage;