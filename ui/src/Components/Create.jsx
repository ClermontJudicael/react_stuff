// src/pages/Create.jsx

import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate
import '../styles.css'; // Assurez-vous d'importer le fichier CSS

const Create = () => {
  const [libelle, setLibelle] = useState('');
  const [valeur, setValeur] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [tauxAmortissement, setTauxAmortissement] = useState('');
  const [jour, setJour] = useState('');
  const [valeurConstante, setValeurConstante] = useState('');
  const navigate = useNavigate(); // Initialisez useNavigate

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPossession = {
      libelle,
      valeur: parseFloat(valeur),
      dateDebut,
      dateFin,
      tauxAmortissement: tauxAmortissement ? parseFloat(tauxAmortissement) : null,
      jour: parseInt(jour, 10),
      valeurConstante: parseFloat(valeurConstante),
    };

    axios.post('http://localhost:3000/possession', newPossession)
      .then(() => {
        navigate('/possession'); // Redirection vers la page des possessions après l'ajout
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout de la possession:', error);
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Ajouter une Nouvelle Possession</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formLibelle">
          <Form.Label>Libellé</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez le libellé"
            value={libelle}
            onChange={(e) => setLibelle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formValeur">
          <Form.Label>Valeur</Form.Label>
          <Form.Control
            type="number"
            placeholder="Entrez la valeur"
            value={valeur}
            onChange={(e) => setValeur(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDateDebut">
          <Form.Label>Date de Début</Form.Label>
          <Form.Control
            type="date"
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDateFin">
          <Form.Label>Date de Fin</Form.Label>
          <Form.Control
            type="date"
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formTauxAmortissement">
          <Form.Label>Taux Amortissement</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            placeholder="Entrez le taux d'amortissement"
            value={tauxAmortissement}
            onChange={(e) => setTauxAmortissement(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formJour">
          <Form.Label>Jour</Form.Label>
          <Form.Control
            type="number"
            placeholder="Entrez le jour"
            value={jour}
            onChange={(e) => setJour(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formValeurConstante">
          <Form.Label>Valeur Constante</Form.Label>
          <Form.Control
            type="number"
            placeholder="Entrez la valeur constante"
            value={valeurConstante}
            onChange={(e) => setValeurConstante(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Ajouter
        </Button>
      </Form>
    </div>
  );
};

export default Create;
