// ItemListContainer.js
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchItems } from '../App';

const ItemListContainer = () => {
  const { categoryid } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchAndSetItems = async () => {
      try {
        const fetchedItems = await fetchItems(categoryid);
        setItems(fetchedItems);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchAndSetItems();
  }, [categoryid]);

  return (
    <div className="container mt-4">
      <h2>Catálogo de Productos</h2>
      {items.map(item => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p>Precio: ${item.price}</p>
          <p>Stock: {item.stock}</p>
          <img src={item.imageId} alt={item.title} style={{ maxWidth: '150px' }} />
          <Link to={`/item/${item.id}`}>Comprar</Link>
        </div>
      ))}
    </div>
  );
};

export default ItemListContainer;