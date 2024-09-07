// ui/src/pages/Patrimoine.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PossessionsChart from './Chart';

const Patrimoine = () => {
  const [possessions, setPossessions] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_UR}/possession`)
      .then(response => setPossessions(response.data))
      .catch(error => console.error('Erreur lors de la récupération des données:', error));
  }, []);

  return (
    <div>
      <h1>Possession Chart</h1>
      <PossessionsChart possessions={possessions} />
    </div>
  );
};

export default Patrimoine;
