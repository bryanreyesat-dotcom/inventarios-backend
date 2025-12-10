const { Router } = require('express');
const { crearUsuario, listarUsuarios } = require('../controllers/usuario-controller');

const router = Router();

// Rutas http://localhost:4000/usuarios
router.post('/', crearUsuario);
router.get('/', listarUsuarios);

module.exports = router;