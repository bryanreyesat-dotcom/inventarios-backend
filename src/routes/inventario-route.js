const { Router } = require('express');
const { crearInventario, listarInventarios, editarInventario } = require('../controllers/inventario-controller');
const router = Router();

router.post('/', crearInventario);
router.get('/', listarInventarios);
router.put('/:id', editarInventario); // Nueva

module.exports = router;