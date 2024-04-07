const express = require('express');
const server = express();
const cors = require('cors');
const trilhas = require('./src/data/trilhas.json')

server.use(cors());

server.get('/trilhas', (req,res) => {
    return res.json({trilhas})
});

server.listen(3000, () => {
    console.log("Servidor funcionando!");
});