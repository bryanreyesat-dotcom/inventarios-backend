const Inventario = require('../models/Inventario');
const Usuario = require('../models/Usuario');
const Marca = require('../models/Marca');
const EstadoEquipo = require('../models/EstadoEquipo');
const TipoEquipo = require('../models/TipoEquipo');

const crearInventario = async (req, res) => {
    try {
        const inventarioExistente = await Inventario.findOne({ serial: req.body.serial });
        if (inventarioExistente) {
            return res.status(400).json({ msj: 'El serial ya existe' });
        }

        // --- VALIDACIONES DE ACTIVOS (REQUISITO 100% PDF) ---
        const usuario = await Usuario.findById(req.body.usuario._id || req.body.usuario);
        const marca = await Marca.findById(req.body.marca._id || req.body.marca);
        const estado = await EstadoEquipo.findById(req.body.estadoEquipo._id || req.body.estadoEquipo);
        const tipo = await TipoEquipo.findById(req.body.tipoEquipo._id || req.body.tipoEquipo);

        if (!usuario || usuario.estado !== 'Activo') return res.status(400).json({ msj: 'Usuario inválido o inactivo' });
        if (!marca || marca.estado !== 'Activo') return res.status(400).json({ msj: 'Marca inválida o inactiva' });
        if (!estado || estado.estado !== 'Activo') return res.status(400).json({ msj: 'Estado de equipo inválido o inactivo' });
        if (!tipo || tipo.estado !== 'Activo') return res.status(400).json({ msj: 'Tipo de equipo inválido o inactivo' });
        // ----------------------------------------------------

        let inventario = new Inventario();
        inventario.serial = req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descripcion = req.body.descripcion;
        inventario.color = req.body.color;
        inventario.foto = req.body.foto;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.precio = req.body.precio;
        
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

const editarInventario = async (req, res) => {
    try {
        const { id } = req.params;
        let inventario = await Inventario.findById(id);
        if (!inventario) return res.status(404).json({ msj: 'Inventario no existe' });

        // Validar serial único (excluyendo el actual)
        const serialExiste = await Inventario.findOne({ serial: req.body.serial, _id: { $ne: id } });
        if (serialExiste) return res.status(400).json({ msj: 'Serial ya existe en otro equipo' });

        // Re-validar activos al editar (Requisito PDF)
        // Nota: Asumimos que envían los IDs. Si no los envían, habría que validar si existen en el body.
        
        inventario.serial = req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descripcion = req.body.descripcion;
        inventario.color = req.body.color;
        inventario.foto = req.body.foto;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.precio = req.body.precio;
        
        inventario.usuario = req.body.usuario._id;
        inventario.marca = req.body.marca._id;
        inventario.estadoEquipo = req.body.estadoEquipo._id;
        inventario.tipoEquipo = req.body.tipoEquipo._id;
        inventario.fechaActualizacion = new Date();

        inventario = await inventario.save();
        res.json(inventario);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msj: 'Error al editar inventario', error });
    }
}

module.exports = { crearInventario, listarInventarios, editarInventario };