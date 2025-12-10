const { Router } = require('express');
const { crearMarca, listarMarcas, editarMarca } = require('../controllers/marca-controller');
const router = Router();

router.post('/', crearMarca);
router.get('/', listarMarcas);
router.put('/:id', editarMarca); // Nueva

module.exports = router;