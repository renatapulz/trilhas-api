const path = require("path");
const fs = require("fs");

module.exports.handler = async (event, context) => {
  let trilhas = require(`../../data/trilhas.json`);

  try {
    if (event.httpMethod == "POST") {
      const novaTrilha = JSON.parse(event.body);
      trilhas.push(novaTrilha);

      fs.writeFile('../../data/trilhas.json', JSON.stringify(trilhas), (err) => {
        if (err) {
          return {
            statusCode: 500,
            body: JSON.stringify({"resposta": `Erro ao salvar a trilha recém cadastrada. ${err}`}),
          };
        }
      });

      return {
        statusCode: 201,
        body: JSON.stringify({"resposta": "Trilha adicionada com sucesso!"}),
      };
    }
    else if (event.httpMethod == "GET") {
      return { statusCode: 200, body: JSON.stringify(trilhas) };
    }
  }
  catch (err) {
    console.log(err)
    return { statusCode: 500, body: err.message };
  }

  return {
    statusCode: 405,
    body: "[{}]",
  };
}
