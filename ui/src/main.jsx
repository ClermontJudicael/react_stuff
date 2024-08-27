import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Patrimoine from './Components/Patrimoine';
import Possession from './Components/Possession';
import Create from './Components/Create';
import PossessionUpdate from './Components/Update_Possession';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/patrimoine" element={<Patrimoine />} />
        <Route path="/possession" element={<Possession />} />
        <Route path="/possession/create" element={<Create />} />
        <Route path="/possession/:libelle/update" element={<PossessionUpdate />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
