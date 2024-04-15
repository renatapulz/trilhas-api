const express = require('express');
const server = express();
const cors = require('cors');
const trilhas = require('./src/data/trilhas.json')

server.use(express.json());
server.use(cors());

server.get('/trilhas', (req,res) => {
    return res.json({trilhas})
});

server.post('/cadastro', (req, res) => {
    const { nomeTrilha, cidade, estado, duracao, trajeto, dificuldade, tipo, nomeUsuario, UrlImage } = req.body;
    
    if (!nomeTrilha || !cidade || !estado || !duracao || !trajeto || !dificuldade || !tipo || !nomeUsuario || !UrlImage) {
        return res.status(400).json({ error: 'Há campos não preenchidos.' });
    }

    const novaTrilha = req.body;
    trilhas.push(novaTrilha);

    const fs = require('fs');
    fs.writeFile('./src/data/trilhas.json', JSON.stringify(trilhas), (err) => {
    if (err) {
        return res.status(500).json({ error: 'Erro ao salvar a trilha recém cadastrada.' });
    }
    return res.status(201).json({ message: 'Trilha adicionada com sucesso!', trilhas });
});
});

server.listen(3000, () => {
    console.log("Servidor funcionando!");
});