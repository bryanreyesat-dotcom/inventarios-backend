const TipoEquipo = require('../models/TipoEquipo');

const crearTipoEquipo = async (req, res) => {
    try {
        let tipoEquipo = new TipoEquipo();
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaCreacion = new Date();
        tipoEquipo.fechaActualizacion = new Date();
        tipoEquipo = await tipoEquipo.save();
        res.send(tipoEquipo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
}

const listarTipoEquipos = async (req, res) => {
    try {
        const tipos = await TipoEquipo.find();
        res.json(tipos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
}

const editarTipoEquipo = async (req, res) => {
    try {
        const { id } = req.params;
        let tipoEquipo = await TipoEquipo.findById(id);
        if (!tipoEquipo) return res.status(404).send('Tipo de equipo no existe');

        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaActualizacion = new Date();

        tipoEquipo = await tipoEquipo.save();
        res.send(tipoEquipo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
}

module.exports = { crearTipoEquipo, listarTipoEquipos, editarTipoEquipo };