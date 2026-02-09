/*const { planesEmpresas } = require('../Data/PlanesEmpresas.js');
const { planesMonotributo } = require('../Data/PlanesMono.js');*/
const { planes} = require('../Data/Planes.js');

/*const getPlanesEmpresas = (req, res) => {
    res.json(planesEmpresas);
};

const getPlanesEmprendedores = (req, res) => {
    res.json(planesMonotributo);
};
*/
const getPlanes = (req, res) => {
    res.json(planes);
};
module.exports = { getPlanes };
