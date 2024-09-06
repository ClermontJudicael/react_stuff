import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import usePossessionForm from '../functions/usePossessionForm';
import './Create.css'

const CreatePossession = () => {
  const navigate = useNavigate(); // Hook pour la navigation
  const { formData, handleChange, handleSubmit } = usePossessionForm(navigate); 

  return (
      <>
      <h2>Ajouter une Nouvelle Possession</h2>
      <div>
      <Form onSubmit={handleSubmit} className='form'>
        <Form.Group controlId="formLibelle">
          <Form.Label>Libellé</Form.Label>
          <Form.Control
            className='input'
            type="text"
            name="libelle"
            value={formData.libelle}
            onChange={handleChange}
            required />
        </Form.Group>
        <Form.Group controlId="formValeur">
          <Form.Label>Valeur</Form.Label>
          <Form.Control
            className='input'
            type="number"
            name="valeur"
            value={formData.valeur}
            onChange={handleChange}
            required />
        </Form.Group>
        <Form.Group controlId="formDateDebut">
          <Form.Label>Date de Début</Form.Label>
          <Form.Control
            className='input'
            type="date"
            name="dateDebut"
            value={formData.dateDebut}
            onChange={handleChange}
            required />
        </Form.Group>
        <Form.Group controlId="formDateFin">
          <Form.Label>Date de Fin</Form.Label>
          <Form.Control
            className='input'
            type="date"
            name="dateFin"
            value={formData.dateFin}
            onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="formTauxAmortissement">
          <Form.Label>Taux Amortissement</Form.Label>
          <Form.Control
            className='input'
            type="number"
            name="tauxAmortissement"
            value={formData.tauxAmortissement}
            onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="formJour">
          <Form.Label>Jour</Form.Label>
          <Form.Control
            className='input'
            type="number"
            name="jour"
            value={formData.jour}
            onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="formValeurConstante">
          <Form.Label>Valeur Constante</Form.Label>
          <Form.Control
            className='input'
            type="number"
            name="valeurConstante"
            value={formData.valeurConstante}
            onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="formType">
          <Form.Label>Type</Form.Label>
          <Form.Control
            className='input'
            as="select"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Choisir un type</option>
            <option value="Materiel">Materiel</option>
            <option value="Flux">Flux</option>
            <option value="Argent">Argent</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Valider
        </Button>
      </Form>
    </div></>
  );
};

export default CreatePossession;
