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
        const tipos = await EstadoEquipo.find();
        res.json(tipos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
}

module.exports = { crearEstadoEquipo, listarEstadoEquipos };