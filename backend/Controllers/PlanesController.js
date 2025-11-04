const { planesEmpresas } = require('../Data/PlanesEmpresas.js');
const { planesMonotributo } = require('../Data/PlanesMono.js');

const getPlanesEmpresas = (req, res) => {
    res.json(planesEmpresas);
};

const getPlanesEmprendedores = (req, res) => {
    res.json(planesMonotributo);
};

module.exports = { getPlanesEmpresas, getPlanesEmprendedores };
