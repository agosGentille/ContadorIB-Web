const express = require('express');
const router = express.Router();

const { getPlanesEmpresas, getPlanesEmprendedores } = require('../Controllers/PlanesController');

// Ruta para todos los planes enfocados en empresas
router.get('/PlanesEmpresas', getPlanesEmpresas);

// Ruta para todos los planes enfocados en emprendedores
router.get('/PlanesEmprendedores', getPlanesEmprendedores);

module.exports = router;
