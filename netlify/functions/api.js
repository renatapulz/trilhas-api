import express, { Router } from "express";
import serverless from "serverless-http";

const cors = require('cors');
const fs = require('fs');
const api = express();
const router = Router();

const trilhas = require('./trilhas.json');

router.get('/trilhas', (req, res) => {
  return res.json({trilhas})
});

router.post('/cadastro', (req, res) => {
  const { nomeTrilha, cidade, estado, duracao, trajeto, dificuldade, tipo, nomeUsuario, UrlImage } = req.body;

  if (!nomeTrilha || !cidade || !estado || !duracao || !trajeto || !dificuldade || !tipo || !UrlImage) {
    return res.status(400).json({ error: 'Há campos não preenchidos.' });
  }

  const novaTrilha = req.body;
  trilhas.push(novaTrilha);

  fs.writeFile('./src/data/trilhas.json', JSON.stringify(trilhas), (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao salvar a trilha recém cadastrada.' });
    }
    return res.status(201).json({ message: 'Trilha adicionada com sucesso!', trilhas });
  });
});

const corsOptions = {
  origin: '*',
  credentials: false,
  optionSuccessStatus: 200
}
api.use(cors(corsOptions));
api.use("/api/", router);

export const handler = serverless(api);
