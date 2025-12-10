const EstadoEquipo = require('../models/EstadoEquipo');

const crearEstadoEquipo = async (req, res) => {
    try {
        let estadoEquipo = new EstadoEquipo();
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaCreacion = new Date();
        estadoEquipo.fechaActualizacion = new Date();
        estadoEquipo = await estadoEquipo.save();
        res.send(estadoEquipo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
}

const listarEstadoEquipos = async (req, res) => {
    try {
        const estados = await EstadoEquipo.find();
        res.json(estados);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
}

const editarEstadoEquipo = async (req, res) => {
    try {
        const { id } = req.params;
        let estadoEquipo = await EstadoEquipo.findById(id);
        if (!estadoEquipo) return res.status(404).send('Estado no existe');

        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaActualizacion = new Date();

        estadoEquipo = await estadoEquipo.save();
        res.send(estadoEquipo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
}

module.exports = { crearEstadoEquipo, listarEstadoEquipos, editarEstadoEquipo };