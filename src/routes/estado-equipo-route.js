const { Router } = require('express');
const { crearEstadoEquipo, listarEstadoEquipos, editarEstadoEquipo } = require('../controllers/estado-equipo-controller');

const router = Router();

// Rutas http://localhost:4000/estados-equipos
router.post('/', crearEstadoEquipo);
router.get('/', listarEstadoEquipos);
router.put('/:id', editarEstadoEquipo); // Ruta para editar

module.exports = router;