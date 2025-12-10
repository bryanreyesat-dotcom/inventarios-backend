const { Router } = require('express');
const { crearTipoEquipo, listarTipoEquipos } = require('../controllers/tipo-equipo-controller');
const router = Router();

router.post('/', crearTipoEquipo);
router.get('/', listarTipoEquipos);

module.exports = router;