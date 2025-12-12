const { Router } = require('express');
const { crearMarca, listarMarcas, editarMarca } = require('../controllers/marca-controller');

const router = Router();

// Rutas http://localhost:4000/marcas
router.post('/', crearMarca);
router.get('/', listarMarcas);
router.put('/:id', editarMarca); // Ruta para editar

module.exports = router;