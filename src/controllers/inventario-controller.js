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

        // 1. OBTENER LOS IDs (Ya sea que vengan como objeto o string)
        const usuarioId = req.body.usuario._id || req.body.usuario;
        const marcaId = req.body.marca._id || req.body.marca;
        const estadoId = req.body.estadoEquipo._id || req.body.estadoEquipo;
        const tipoId = req.body.tipoEquipo._id || req.body.tipoEquipo;

        // 2. VALIDACIONES DE ACTIVOS
        const usuario = await Usuario.findById(usuarioId);
        const marca = await Marca.findById(marcaId);
        const estado = await EstadoEquipo.findById(estadoId);
        const tipo = await TipoEquipo.findById(tipoId);

        if (!usuario || usuario.estado !== 'Activo') return res.status(400).json({ msj: 'Usuario inválido o inactivo' });
        if (!marca || marca.estado !== 'Activo') return res.status(400).json({ msj: 'Marca inválida o inactiva' });
        if (!estado || estado.estado !== 'Activo') return res.status(400).json({ msj: 'Estado de equipo inválido o inactivo' });
        if (!tipo || tipo.estado !== 'Activo') return res.status(400).json({ msj: 'Tipo de equipo inválido o inactivo' });

        // 3. CREAR EL INVENTARIO
        let inventario = new Inventario();
        inventario.serial = req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descripcion = req.body.descripcion;
        inventario.color = req.body.color;
        inventario.foto = req.body.foto;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.precio = req.body.precio;
        
        // ASIGNACIÓN CORREGIDA (Usamos las variables limpias de arriba)
        inventario.usuario = usuarioId;
        inventario.marca = marcaId;
        inventario.estadoEquipo = estadoId;
        inventario.tipoEquipo = tipoId;

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

        const serialExiste = await Inventario.findOne({ serial: req.body.serial, _id: { $ne: id } });
        if (serialExiste) return res.status(400).json({ msj: 'Serial ya existe en otro equipo' });

        // Obtener IDs seguros también para la edición
        const usuarioId = req.body.usuario._id || req.body.usuario;
        const marcaId = req.body.marca._id || req.body.marca;
        const estadoId = req.body.estadoEquipo._id || req.body.estadoEquipo;
        const tipoId = req.body.tipoEquipo._id || req.body.tipoEquipo;
        
        inventario.serial = req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descripcion = req.body.descripcion;
        inventario.color = req.body.color;
        inventario.foto = req.body.foto;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.precio = req.body.precio;
        
        // Asignación corregida
        inventario.usuario = usuarioId;
        inventario.marca = marcaId;
        inventario.estadoEquipo = estadoId;
        inventario.tipoEquipo = tipoId;
        
        inventario.fechaActualizacion = new Date();

        inventario = await inventario.save();
        res.json(inventario);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msj: 'Error al editar inventario', error });
    }
}

module.exports = { crearInventario, listarInventarios, editarInventario };