const { Router } = require('express');
const { crearMarca, listarMarcas } = require('../controllers/marca-controller');
const router = Router();

router.post('/', crearMarca);
router.get('/', listarMarcas);

module.exports = router;