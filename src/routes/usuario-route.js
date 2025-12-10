const { Router } = require('express');
const { crearUsuario, listarUsuarios, editarUsuario } = require('../controllers/usuario-controller');
const router = Router();

router.post('/', crearUsuario);
router.get('/', listarUsuarios);
router.put('/:id', editarUsuario); // Nueva

module.exports = router;