/// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import CartWidget from './CartWidget';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Tienda
      </Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/category/Camisetas">
              Camisetas
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/category/pantalones">
              Pantalones
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/category/zapatos">
              Zapatos
            </Link>
          </li>
        </ul>
      </div>
      <CartWidget />
    </nav>
  );
};

export default NavBar;