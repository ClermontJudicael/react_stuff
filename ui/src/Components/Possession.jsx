// src/components/PossessionTable.jsx

import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import '../styles.css'; // Assurez-vous d'importer le fichier CSS

const Possession = () => {
  const [possessions, setPossessions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/possession')
      .then(response => {
        setPossessions(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }, []);

  const handleEdit = (possession) => {
    setEditData(possession);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/possession/${id}`)
      .then(() => {
        setPossessions(possessions.filter(possession => possession.id !== id));
      })
      .catch(error => {
        console.error('Erreur lors de la suppression des données:', error);
      });
  };

  const handleSaveChanges = () => {
    axios.put(`http://localhost:3000/possession/${editData.id}`, editData)
      .then(() => {
        setPossessions(possessions.map(possession =>
          possession.id === editData.id ? editData : possession
        ));
        setShowModal(false);
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour des données:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div>
      <h2>Liste des Possessions</h2>
      <Table striped bordered hover className="mt-3 table-custom">
        <thead>
          <tr>
            <th>Libellé</th>
            <th>Valeur</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Taux Amortissement</th>
            <th>Jour</th>
            <th>Valeur Constante</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {possessions.map((possession) => (
            <tr key={possession.id}>
              <td>{possession.libelle}</td>
              <td>{possession.valeur}</td>
              <td>{new Date(possession.dateDebut).toLocaleDateString()}</td>
              <td>{possession.dateFin ? new Date(possession.dateFin).toLocaleDateString() : 'N/A'}</td>
              <td>{possession.tauxAmortissement}</td>
              <td>{possession.jour}</td>
              <td>{possession.valeurConstante}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(possession)} className="me-2">
                  Modifier
                </Button>
                <Button variant="danger" onClick={() => handleDelete(possession.id)}>
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {editData && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Modifier la Possession</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formLibelle">
                <Form.Label>Libellé</Form.Label>
                <Form.Control
                  type="text"
                  name="libelle"
                  value={editData.libelle}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formValeur">
                <Form.Label>Valeur</Form.Label>
                <Form.Control
                  type="number"
                  name="valeur"
                  value={editData.valeur}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formDateFin">
                <Form.Label>Date de Fin</Form.Label>
                <Form.Control
                  type="date"
                  name="dateFin"
                  value={editData.dateFin?.substring(0, 10) || ''}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formTauxAmortissement">
                <Form.Label>Taux Amortissement</Form.Label>
                <Form.Control
                  type="number"
                  name="tauxAmortissement"
                  value={editData.tauxAmortissement || ''}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formJour">
                <Form.Label>Jour</Form.Label>
                <Form.Control
                  type="number"
                  name="jour"
                  value={editData.jour || ''}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formValeurConstante">
                <Form.Label>Valeur Constante</Form.Label>
                <Form.Control
                  type="number"
                  name="valeurConstante"
                  value={editData.valeurConstante || ''}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Fermer
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Enregistrer les Modifications
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Possession;
