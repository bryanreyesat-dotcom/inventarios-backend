const { Router } = require('express');
const { crearTipoEquipo, listarTipoEquipos, editarTipoEquipo } = require('../controllers/tipo-equipo-controller');

const router = Router();

// Rutas http://localhost:4000/tipos-equipos
router.post('/', crearTipoEquipo);
router.get('/', listarTipoEquipos);
router.put('/:id', editarTipoEquipo); // Ruta para editar

module.exports = router;