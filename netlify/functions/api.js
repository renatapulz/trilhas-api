import express, { Router, response } from "express";
import serverless from "serverless-http";

const cors = require('cors');
const fs = require('fs');
const api = express();
const router = Router();

router.get('/trilhas', (req, res) => {
  fetch('https://trilhas-api.netlify.app/trilhas')
    .then(response => response.json())
    .then(response => {
      return res.json(response)
    });
});

router.post('/cadastro', (req, res) => {
  const { nomeTrilha, cidade, estado, duracao, trajeto, dificuldade, tipo, nomeUsuario, UrlImage } = req.body;

  if (!nomeTrilha || !cidade || !estado || !duracao || !trajeto || !dificuldade || !tipo || !UrlImage) {
    return res.status(400).json({ error: 'Há campos não preenchidos.' });
  }

  const novaTrilha = req.body;
  fetch('https://trilhas-api.netlify.app/trilhas', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(novaTrilha)
    })
    .then(response => response.json())
    .then(response => {
      return res.json(response)
    });
});

const corsOptions = {
  origin: '*',
  credentials: false,
  optionSuccessStatus: 200
}
api.use(cors(corsOptions));
api.use(express.json());
api.use("/api/", router);

export const handler = serverless(api);
