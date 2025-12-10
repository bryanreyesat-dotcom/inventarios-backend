const { Router } = require('express');
const { crearEstadoEquipo, listarEstadoEquipos } = require('../controllers/estado-equipo-controller');
const router = Router();

router.post('/', crearEstadoEquipo);
router.get('/', listarEstadoEquipos);

module.exports = router;