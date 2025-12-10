const Usuario = require('../models/Usuario');

// Función 1: Crear Usuario
const crearUsuario = async (req, res) => {
    try {
        const usuarioExistente = await Usuario.findOne({ email: req.body.email });
        if (usuarioExistente) {
            return res.status(400).json({ msj: 'Email ya existe' });
        }

        let usuario = new Usuario();
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.password = req.body.password;
        usuario.rol = req.body.rol;
        
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();
        res.status(201).json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msj: 'Error al crear usuario', error });
    }
}

// Función 2: Listar Usuarios (Esta era la que faltaba o estaba mal)
const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msj: 'Error al listar usuarios', error });
    }
}

// Exportar ambas
module.exports = { crearUsuario, listarUsuarios };