const Inventario = require('../models/Inventario');

const crearInventario = async (req, res) => {
    try {
        const inventarioExistente = await Inventario.findOne({ serial: req.body.serial });
        if (inventarioExistente) {
            return res.status(400).json({ msj: 'El serial ya existe' });
        }

        let inventario = new Inventario();
        inventario.serial = req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descripcion = req.body.descripcion;
        inventario.color = req.body.color;
        inventario.foto = req.body.foto;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.precio = req.body.precio;
        
        // Relaciones (Asumiendo que envían los IDs)
        inventario.usuario = req.body.usuario._id;
        inventario.marca = req.body.marca._id;
        inventario.estadoEquipo = req.body.estadoEquipo._id;
        inventario.tipoEquipo = req.body.tipoEquipo._id;

        inventario.fechaCreacion = new Date();
        inventario.fechaActualizacion = new Date();

        inventario = await inventario.save();
        res.status(201).json(inventario);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msj: 'Error al guardar inventario', error });
    }
}

const listarInventarios = async (req, res) => {
    try {
        const inventarios = await Inventario.find()
            .populate('usuario', 'nombre email')
            .populate('marca', 'nombre')
            .populate('estadoEquipo', 'nombre')
            .populate('tipoEquipo', 'nombre');
        res.json(inventarios);
    } catch (error) {
        res.status(500).json({ msj: 'Error al listar inventarios', error });
    }
}

module.exports = { crearInventario, listarInventarios };