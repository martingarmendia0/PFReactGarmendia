// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailsContainer';
import { getFirestore, getDocs, collection, query, where } from "firebase/firestore";
import CartPage from './components/Cart';
import { CartProvider } from './contexts/CartContext';
import Checkout from './components/Checkout';

export const fetchItems = async (categoryId = null) => {
  const db = getFirestore();
  const itemsCollection = collection(db, "Items");

  let firebaseQuery = itemsCollection;
  if (categoryId) {
    firebaseQuery = query(firebaseQuery, where('categoryId', '==', categoryId));
  }

  try {
    const querySnapshot = await getDocs(firebaseQuery);
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return items;
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
};

function App() {
  return (
    <Router>
      <div>
        <CartProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route path="/category/:categoryid" element={<ItemListContainer />} />
            <Route path="/item/:itemid" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </CartProvider>
      </div>
    </Router>
  );
}

export default App;