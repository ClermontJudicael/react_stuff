// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Patrimoine from './Components/Patrimoine';
import Possession from './Components/Possession';
import Create from './Components/Create';
import PossessionUpdate from './Components/Update_Possession';
import './App.css'; 

const App = () => {
  return (
    <div>
      <Header /> {/* Le Header sera affiché sur toutes les pages */}
      <div className="app-banner">
        <h1>Hello Hello !!!</h1>
      </div>
      <Routes>
        <Route path="/patrimoine" element={<Patrimoine />} />
        <Route path="/possession" element={<Possession />} />
        <Route path="/possession/create" element={<Create />} />
        <Route path="/possession/:libelle/update" element={<PossessionUpdate />} />
        {/* Ajoutez d'autres routes ici si nécessaire */}
      </Routes>
    </div>
  );
};

export default App;
