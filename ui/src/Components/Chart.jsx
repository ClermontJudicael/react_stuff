import Patrimoine from '../../../patrimoine/models/Patrimoine';
import Possession from '../../../patrimoine/models/possessions/Possession';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const PossessionsChart = () => {
  const [dateDebut, setDateDebut] = useState(null);
  const [dateFin, setDateFin] = useState(null);
  const [valeurPatrimoine, setValeurPatrimoine] = useState(null);

  const generateDateRange = (startDate, endDate, intervalMonths) => {
    const dates = [];
    const currentDate = new Date(startDate);
    const interval = intervalMonths * 30; // Approximate number of days in a month

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + interval);
    }

    return dates;
  };

  const calculatePatrimoineValue = async () => {
    if (!dateDebut || !dateFin) {
      console.error('Les dates de début et de fin doivent être sélectionnées.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:3000/possession');
      const possessionsData = response.data;

      const possessionsInstances = possessionsData.map(p => {
        if (p.possesseur && p.libelle && p.valeur !== undefined && p.dateDebut) {
          return new Possession(
            p.possesseur.nom,
            p.libelle,
            p.valeur,
            new Date(p.dateDebut),
            p.dateFin ? new Date(p.dateFin) : null,
            p.tauxAmortissement || 0
          );
        } else {
          console.error('Données manquantes pour la possession:', p);
          return null;
        }
      }).filter(p => p !== null);

      if (possessionsInstances.length === 0) {
        console.error('Aucune possession valide trouvée.');
        return;
      }

      const patrimoine = new Patrimoine(possessionsInstances[0]?.possesseur, possessionsInstances);

      const dates = generateDateRange(dateDebut, dateFin, 4);
      const values = dates.map(date => patrimoine.getValeur(date));

      const data = {
        labels: dates.map(date => date.toLocaleDateString()),
        datasets: [
          {
            label: 'Valeur du Patrimoine',
            data: values,
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
          },
        ],
      };

      setValeurPatrimoine(data);

    } catch (error) {
      console.error('Erreur lors du calcul de la valeur du patrimoine:', error);
    }
  };

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
    <div style={{ width: '80vw', height: '60vh', margin: '0 auto' }}>
      <Row className="my-4">
        <Col>
          <Form.Group>
            <Form.Label>Date Début</Form.Label>
            <DatePicker
              selected={dateDebut}
              onChange={date => setDateDebut(date)}
              className="form-control"
              placeholderText="Sélectionner la date de début"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Date Fin</Form.Label>
            <DatePicker
              selected={dateFin}
              onChange={date => setDateFin(date)}
              className="form-control"
              placeholderText="Sélectionner la date de fin"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="my-4">
        <Col>
          <Button variant="success" onClick={calculatePatrimoineValue}>
            Validates
          </Button>
        </Col>
      </Row>

      {valeurPatrimoine && (
        <Line data={valeurPatrimoine} options={options} />
      )}
    </div>
  );
};

export default PossessionsChart;
