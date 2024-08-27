import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li><Link to="/patrimoine">Patrimoine</Link></li>
          <li><Link to="/possession">Possession</Link></li>
        </ul>
      </nav>
      <main>
        <h1>Welcome to the App</h1>
      </main>
    </div>
  );
}

export default App;
