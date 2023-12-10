// index.js
import React from 'react';
import { createRoot, ReactDOM } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC0H52B-n8FRwfOXs5Ol50-u9_bf4k-i4s",
  authDomain: "ecommerce-coderhouse-39760.firebaseapp.com",
  projectId: "ecommerce-coderhouse-39760",
  storageBucket: "ecommerce-coderhouse-39760.appspot.com",
  messagingSenderId: "557505436726",
  appId: "1:557505436726:web:7eaf27796e2be8b2dccc97"
};

const app = initializeApp(firebaseConfig);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);