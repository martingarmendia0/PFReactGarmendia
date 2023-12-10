// ItemDetailContainer.js
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import { useParams } from 'react-router-dom';
import { fetchItems } from '../App';

const ItemDetailContainer = () => {
  const { itemid } = useParams();
  const { addToCart } = useContext(CartContext);
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const items = await fetchItems();
        const selectedItem = items.find((product) => product.id === itemid);
        setItem(selectedItem);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    fetchItem();
  }, [itemid]);

  const handleAddToCart = () => {
    if (item) {
      addToCart(item, quantity);
    }
  };

  return (
    <div className="container mt-4">
      {item ? (
        <div>
          <img src={item.imageId} alt={item.name} style={{ maxWidth: '200px' }} />
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <p>Precio: ${item.price}</p>
          <p>Stock disponible: {item.stock}</p>
          <label>
            Cantidad:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              min="1"
              max={item.stock}
            />
          </label>
          <button onClick={handleAddToCart}>Agregar al Carrito</button>
        </div>
      ) : (
        <p>Producto no encontrado</p>
      )}
    </div>
  );
};

export default ItemDetailContainer;