const { Router } = require('express');
const { crearEstadoEquipo, listarEstadoEquipos, editarEstadoEquipo } = require('../controllers/estado-equipo-controller');
const router = Router();

router.post('/', crearEstadoEquipo);
router.get('/', listarEstadoEquipos);
router.put('/:id', editarEstadoEquipo); // Nueva

module.exports = router;