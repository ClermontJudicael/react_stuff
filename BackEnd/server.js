// BackEnd/server.js

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtenir le répertoire du module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(cors()); // Ajoutez CORS pour permettre les requêtes depuis d'autres origines
app.use(express.json());

const dataFilePath = path.join(__dirname, 'data.json');

// Fonction pour lire les données
const readData = () => {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
};

// Fonction pour écrire les données
const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Route pour obtenir les possessions
app.get('/possession', (req, res) => {
  const data = readData();
  res.json(data[1].data.possessions);
});

// Route pour ajouter une possession
app.post('/possession', (req, res) => {
  const newPossession = req.body;
  const data = readData();
  data[1].data.possessions.push(newPossession);
  writeData(data);
  res.status(201).json(newPossession); // Répond avec le nouvel objet ajouté
});

// Route pour mettre à jour une possession
app.put('/possession/:id', (req, res) => {
  const { id } = req.params;
  const updatedPossession = req.body;
  const data = readData();
  const index = data[1].data.possessions.findIndex(p => p.id === id);
  if (index !== -1) {
    data[1].data.possessions[index] = { ...data[1].data.possessions[index], ...updatedPossession };
    writeData(data);
    res.json(data[1].data.possessions[index]);
  } else {
    res.status(404).send('Possession non trouvée');
  }
});

// Route pour supprimer une possession
app.delete('/possession/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();
  const newPossessions = data[1].data.possessions.filter(p => p.id !== id);
  if (newPossessions.length < data[1].data.possessions.length) {
    data[1].data.possessions = newPossessions;
    writeData(data);
    res.status(204).send();
  } else {
    res.status(404).send('Possession non trouvée');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
