const { Router } = require('express');
const { crearTipoEquipo, listarTipoEquipos, editarTipoEquipo } = require('../controllers/tipo-equipo-controller');
const router = Router();

router.post('/', crearTipoEquipo);
router.get('/', listarTipoEquipos);
router.put('/:id', editarTipoEquipo); // Nueva

module.exports = router;