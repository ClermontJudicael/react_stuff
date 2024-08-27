// BackEnd/server.js

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(express.json());
app.use(cors());

// Chemin absolu vers le fichier JSON
const dataPath = path.join(process.cwd(), 'data.json');

// Lire le fichier JSON
let possessions = JSON.parse(fs.readFileSync(dataPath, 'utf8')).find(item => item.model === 'Patrimoine')?.data.possessions || [];

app.get('/possession', (req, res) => {
  res.json(possessions);
});

app.put('/possession/:id', (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const index = possessions.findIndex(possession => possession.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Possession not found' });
  }

  possessions[index] = { ...possessions[index], ...updatedData };
  res.json(possessions[index]);
});

app.delete('/possession/:id', (req, res) => {
  const { id } = req.params;
  possessions = possessions.filter(possession => possession.id !== id);
  res.status(204).end();
});

app.listen(3000, () => console.log('Server running on port 3000'));
