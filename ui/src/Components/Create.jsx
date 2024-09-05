import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // Importer uuid
import '../styles.css';

const CreatePossession = () => {
  const [formData, setFormData] = useState({
    libelle: '',
    valeur: '',
    dateDebut: '',
    dateFin: '',
    tauxAmortissement: '',
    jour: '',
    valeurConstante: ''
  });
  const navigate = useNavigate(); // Hook pour la navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ajouter un identifiant unique à la possession
    const newPossession = {
      id: uuidv4(), // Générer un ID unique
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

  return (
    <div>
      <h2>Ajouter une Nouvelle Possession</h2>
      <Form onSubmit={handleSubmit} className='form'>
        <Form.Group controlId="formLibelle">
          <Form.Label>Libellé</Form.Label>
          <Form.Control
            type="text"
            name="libelle"
            value={formData.libelle}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formValeur">
          <Form.Label>Valeur</Form.Label>
          <Form.Control
            type="number"
            name="valeur"
            value={formData.valeur}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDateDebut">
          <Form.Label>Date de Début</Form.Label>
          <Form.Control
            type="date"
            name="dateDebut"
            value={formData.dateDebut}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDateFin">
          <Form.Label>Date de Fin</Form.Label>
          <Form.Control
            type="date"
            name="dateFin"
            value={formData.dateFin}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formTauxAmortissement">
          <Form.Label>Taux Amortissement</Form.Label>
          <Form.Control
            type="number"
            name="tauxAmortissement"
            value={formData.tauxAmortissement}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formJour">
          <Form.Label>Jour</Form.Label>
          <Form.Control
            type="number"
            name="jour"
            value={formData.jour}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formValeurConstante">
          <Form.Label>Valeur Constante</Form.Label>
          <Form.Control
            type="number"
            name="valeurConstante"
            value={formData.valeurConstante}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Valider
        </Button>
      </Form>
    </div>
  );
};

export default CreatePossession;
