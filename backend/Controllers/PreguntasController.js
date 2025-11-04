const { preguntas } = require('../Data/PreguntasFrecuentes.js');

const getPreguntas = (req, res) => {
    res.json(preguntas);
};


module.exports = { getPreguntas };
