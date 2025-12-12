const TipoEquipo = require('../models/TipoEquipo');

const crearTipoEquipo = async (req, res) => {
    try {
        let tipoEquipo = new TipoEquipo();
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaCreacion = new Date();
        tipoEquipo.fechaActualizacion = new Date();

        tipoEquipo = await tipoEquipo.save();
        res.status(201).json(tipoEquipo); // Usamos json explícito
    } catch (error) {
        console.log("❌ Error en crearTipoEquipo:", error); // Esto saldrá en la consola del servidor
        res.status(500).json({ msj: 'Error al crear tipo', error: error.message });
    }
}

const listarTipoEquipos = async (req, res) => {
    try {
        const tipos = await TipoEquipo.find();
        res.json(tipos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msj: 'Error al listar tipos', error: error.message });
    }
}

const editarTipoEquipo = async (req, res) => {
    try {
        const { id } = req.params;
        let tipoEquipo = await TipoEquipo.findById(id);
        if (!tipoEquipo) return res.status(404).json({ msj: 'Tipo no existe' });

        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaActualizacion = new Date();

        tipoEquipo = await tipoEquipo.save();
        res.json(tipoEquipo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msj: 'Error al editar', error: error.message });
    }
}

module.exports = { crearTipoEquipo, listarTipoEquipos, editarTipoEquipo };