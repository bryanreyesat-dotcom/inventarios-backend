const { Router } = require('express');
const { crearInventario, listarInventarios } = require('../controllers/inventario-controller');

const router = Router();

// Rutas http://localhost:4000/inventarios
router.post('/', crearInventario);
router.get('/', listarInventarios);

module.exports = router;