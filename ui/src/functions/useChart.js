import { useState } from 'react';
import axios from 'axios';
import Patrimoine from '../../../patrimoine/models/Patrimoine';
import Possession from '../../../patrimoine/models/possessions/Possession';

export const usePossessionsChart = () => {
  const [valeurPatrimoine, setValeurPatrimoine] = useState(null);
  const [valeurPatrimoineSpecific, setValeurPatrimoineSpecific] = useState(null);

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

  const calculatePatrimoineValue = async (dateDebut, dateFin) => {
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

  const calculatePatrimoineValueSpecific = async (dateSpecific) => {
    if (!dateSpecific) {
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
      const value = patrimoine.getValeur(new Date(dateSpecific));
      setValeurPatrimoineSpecific(value);
    } catch (error) {
      console.error('Erreur lors du calcul de la valeur du patrimoine:', error);
    }
  };

  return {
    valeurPatrimoine,
    valeurPatrimoineSpecific,
    calculatePatrimoineValue,
    calculatePatrimoineValueSpecific,
  };
};
