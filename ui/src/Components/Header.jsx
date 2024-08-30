// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Assurez-vous que le fichier CSS pour le style de l'en-tête existe

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/patrimoine">Patrimoine</Link></li>
          <li><Link to="/possession">Possession</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
