const { Router } = require('express');
const { crearUsuario, listarUsuarios, editarUsuario } = require('../controllers/usuario-controller');
const { validarJWT, esAdmin } = require('../middleware/validar-rol'); // Importar el guardián

const router = Router();

// APLICAMOS LOS CANDADOS
router.post('/', [validarJWT, esAdmin], crearUsuario);
router.get('/', [validarJWT, esAdmin], listarUsuarios);
router.put('/:id', [validarJWT, esAdmin], editarUsuario);

module.exports = router;