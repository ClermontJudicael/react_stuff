// src/hooks/usePossession.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export const usePossession = () => {
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

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/possession/${id}`)
      .then(() => {
        setPossessions(possessions.filter(possession => possession.id !== id));
      })
      .catch(error => {
        console.error('Erreur lors de la suppression des données:', error);
      });
  };

  const handleEdit = (possession) => {
    setEditData({ ...possession, id: possession.id });
    setShowModal(true);
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

  const handleCloturer = (possession) => {
    const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

    const updatedPossession = {
      ...possession,
      dateFin: today
    };

    axios.put(`http://localhost:3000/possession/${possession.id}`, updatedPossession)
      .then(() => {
        setPossessions(possessions.map(p =>
          p.id === possession.id ? updatedPossession : p
        ));
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour de la date de fin:', error);
      });
  };

  return {
    possessions,
    showModal,
    editData,
    handleDelete,
    handleEdit,
    handleSaveChanges,
    handleChange,
    handleCloturer,
    setShowModal
  };
};
