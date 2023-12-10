import React, { useState, useContext } from "react";
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import { CartContext } from '../contexts/CartContext';
import { getFirestore } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, total, clearCart } = useContext(CartContext);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirmacion, setEmailConfirmacion] = useState("");
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validación básica del formulario
    if (!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (email !== emailConfirmacion) {
      setError("Los correos electrónicos no coinciden");
      return;
    }

    // Validar que el carrito tenga elementos antes de continuar
    if (!cartItems || cartItems.length === 0) {
      setError("El carrito está vacío. Agregue productos antes de realizar la compra.");
      return;
    }

    // Crear un nuevo pedido en la colección "orders"
    const db = getFirestore();
    const ordersCollection = collection(db, "orders");

    try {
      const newOrder = {
        name: nombre,
        lastName: apellido,
        phone: telefono,
        email: email,
        items: cartItems,
        price: calculateTotal(),
        createdAt: new Date(),
      };

      const orderRef = await addDoc(ordersCollection, newOrder);
      setOrderId(orderRef.id);

      // Actualizar el stock de los productos en la colección "Items"
      await Promise.all(
        cartItems.map(async (item) => {
          const itemDoc = doc(db, "Items", item.id);
          const itemSnapshot = await getDoc(itemDoc);

          if (itemSnapshot.exists()) {
            const currentStock = itemSnapshot.data().stock;
            const updatedStock = currentStock - item.quantity;

            await updateDoc(itemDoc, { stock: updatedStock });
          }
        })
      );

      // Limpiar el carrito después de completar la compra
      clearCart();

      // No redirigir, solo mostrar el mensaje de agradecimiento
      // navigate(`/thank-you/${orderRef?.id}`);
    } catch (error) {
      console.error("Error creating order:", error);
      setError("Hubo un error al procesar la compra. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div>
      <div>
        <h3>Resumen del Carrito</h3>
        <ul>
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <li key={item.id}>
                {item.title} - Cantidad: {item.quantity} - Subtotal: ${item.price * item.quantity}
              </li>
            ))
          ) : (
            <li>El carrito está vacío</li>
          )}
        </ul>
        <p>Total a Pagar: ${calculateTotal()}</p>
      </div>
      <form onSubmit={handleFormSubmit}>
        <label>
          Nombre:
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </label>
        <label>
          Apellido:
          <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
        </label>
        <label>
          Teléfono:
          <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Confirmar Email:
          <input type="email" value={emailConfirmacion} onChange={(e) => setEmailConfirmacion(e.target.value)} />
        </label>

        <button type="submit">Confirmar Compra</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {orderId && <p>Gracias por su compra. Número de Orden: {orderId}</p>}
    </div>
  );
};

export default Checkout;