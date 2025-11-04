const express = require('express');
const router = express.Router();

const { getPreguntas } = require('../Controllers/PreguntasController');

router.get('/', getPreguntas);

module.exports = router;
