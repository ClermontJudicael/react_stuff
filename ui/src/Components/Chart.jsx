import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import DatePicker from 'react-datepicker';
import { Form, Button, Row, Col } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import './Chart.css';
import { usePossessionsChart } from '../functions/useChart';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const PossessionsChart = () => {
  const [dateDebut, setDateDebut] = useState(null);
  const [dateFin, setDateFin] = useState(null);
  const [dateSpecific, setDateSpecific] = useState(null);

  const { valeurPatrimoine, valeurPatrimoineSpecific, calculatePatrimoineValue, calculatePatrimoineValueSpecific } = usePossessionsChart();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Valeur du Patrimoine au fil du temps',
      },
    },
  };

  return (
    <>
    <div style={{ width: '100%', height: '40vh', margin: '0 auto' }} className='test'>
      <div className='container'>
        <Row className="my-4">
          <Col>
            <Form.Group>
              <Form.Label>Date Début</Form.Label>
              <DatePicker
                selected={dateDebut}
                onChange={date => setDateDebut(date)}
                className="form-control"
                placeholderText="Sélectionner la date de début" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Date Fin</Form.Label>
              <DatePicker
                selected={dateFin}
                onChange={date => setDateFin(date)}
                className="form-control"
                placeholderText="Sélectionner la date de fin" />
            </Form.Group>
          </Col>

          <Col>
            <Button onClick={() => calculatePatrimoineValue(dateDebut, dateFin)}>
              Afficher la Chart
            </Button>
          </Col>
        </Row>
      </div>
      
      <div className='container'>
        <Row className="my-4">
          <Col>
            <Form.Group>
              <Form.Label>Date Spécifique</Form.Label>
              <DatePicker
                selected={dateSpecific}
                onChange={date => setDateSpecific(date)}
                className="form-control"
                placeholderText="Sélectionner la date spécifique" />
            </Form.Group>
          </Col>
          <Col>
            <Button variant="primary" onClick={() => calculatePatrimoineValueSpecific(dateSpecific)}>
              Calculer Valeur à la Date
            </Button>
          </Col>
        </Row>
      </div>

    </div>
          
    {valeurPatrimoineSpecific !== null && (
        <div className="my-4">
          <h4>Valeur du Patrimoine à la Date Spécifique :</h4>
          <p>{valeurPatrimoineSpecific}</p>
        </div>
      )}
    <section>
        {valeurPatrimoine && (
          <Line data={valeurPatrimoine} options={options} />
        )}
      </section>
      </>
  );
};

export default PossessionsChart;
