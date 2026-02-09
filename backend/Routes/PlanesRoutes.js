const express = require('express');
const router = express.Router();

//const { getPlanesEmpresas, getPlanesEmprendedores } = require('../Controllers/PlanesController');

const { getPlanes } = require('../Controllers/PlanesController');

/*router.get('/PlanesEmpresas', getPlanesEmpresas);

router.get('/PlanesEmprendedores', getPlanesEmprendedores);*/

router.get('/Planes', getPlanes);

module.exports = router;
