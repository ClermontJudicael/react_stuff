import { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Importer uuid

const usePossessionForm = (navigate) => {
  const [formData, setFormData] = useState({
    libelle: '',
    valeur: '',
    dateDebut: '',
    dateFin: '',
    tauxAmortissement: '',
    jour: '',
    valeurConstante: '',
    type: '' // Ajouter le type dans le state
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPossession = {
      id: uuidv4(),
      ...formData
    };

    axios.post('http://localhost:3000/possession', newPossession)
      .then(() => {
        navigate('/possession'); // Redirige vers la page de liste après l'ajout
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout de la possession:', error);
      });
  };

  return {
    formData,
    handleChange,
    handleSubmit
  };
};

export default usePossessionForm;
