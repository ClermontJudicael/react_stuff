import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Possession from '../../../patrimoine/models/possessions/Possession';

const CalculateTotalValue = ({ possessions }) => {
  const [dateDebut, setDateDebut] = useState(new Date());
  const [dateFin, setDateFin] = useState(new Date());
  const [totalValue, setTotalValue] = useState(null);

  const calculateTotalValue = () => {
    const total = possessions.reduce((acc, possession) => {
      const possessionInstance = new Possession(
        possession.possesseur.nom,
        possession.libelle,
        possession.valeur,
        new Date(possession.dateDebut),
        new Date(possession.dateFin),
        possession.tauxAmortissement
      );
      return acc + possessionInstance.getValeurApresAmortissement(dateFin);
    }, 0);
    setTotalValue(total);
  };

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <Form.Group>
            <Form.Label>Date Début</Form.Label>
            <DatePicker selected={dateDebut} onChange={date => setDateDebut(date)} className="form-control" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Date Fin</Form.Label>
            <DatePicker selected={dateFin} onChange={date => setDateFin(date)} className="form-control" />
          </Form.Group>
        </Col>
        <Col className="d-flex align-items-end">
          <Button variant="success" onClick={calculateTotalValue}>
            Validates
          </Button>
        </Col>
      </Row>
      {totalValue !== null && (
        <div className="mt-4">
          <h3>Valeur Totale des Possessions: {totalValue.toFixed(2)} </h3>
        </div>
      )}
    </div>
  );
};

export default CalculateTotalValue;
