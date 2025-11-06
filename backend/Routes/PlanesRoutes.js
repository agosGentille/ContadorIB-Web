const express = require('express');
const router = express.Router();

const { getPlanesEmpresas, getPlanesEmprendedores } = require('../Controllers/PlanesController');

router.get('/PlanesEmpresas', getPlanesEmpresas);

router.get('/PlanesEmprendedores', getPlanesEmprendedores);

router.get('/PlanesSociedades', getPlanesEmprendedores);

module.exports = router;
