const { Router } = require('express');
const { crearInventario, listarInventarios, editarInventario } = require('../controllers/inventario-controller');
const { validarJWT, esAdmin } = require('../middleware/validar-rol'); 

const router = Router();

// GET: Solo requiere tener Token válido (Admin o Docente entran)
router.get('/', [validarJWT], listarInventarios);

// POST y PUT: Requiere Token Y ADEMÁS ser Admin (Docente rebotado)
router.post('/', [validarJWT, esAdmin], crearInventario);
router.put('/:id', [validarJWT, esAdmin], editarInventario);

module.exports = router;