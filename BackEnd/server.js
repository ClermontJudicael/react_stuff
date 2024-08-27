import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import cors from 'cors';

// Créez une instance de l'application Express
const app = express();
const port = 3000; // Ou tout autre port que vous préférez

// Configurez CORS
app.use(cors());

// Fonction pour lire le fichier JSON
const getData = async () => {
  const filePath = path.resolve('data.json'); // Assurez-vous que le chemin est correct
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
};

// Route pour afficher les possessions
app.get('/possession', async (req, res) => {
  try {
    const data = await getData();
    const patrimoine = data.find(item => item.model === 'Patrimoine');
    
    if (patrimoine && patrimoine.data && patrimoine.data.possessions) {
      res.json(patrimoine.data.possessions);
    } else {
      res.status(404).json({ message: 'Aucune possession trouvée' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la lecture des données', error: error.message });
  }
});

// Démarrez le serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});
