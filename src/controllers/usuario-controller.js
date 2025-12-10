const Usuario = require('../models/Usuario');

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

const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msj: 'Error al listar usuarios', error });
    }
}

const editarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        let usuario = await Usuario.findById(id);
        if (!usuario) return res.status(404).json({ msj: 'Usuario no existe' });

        // Validar si quiere cambiar el email y ya existe en otro usuario
        const emailExiste = await Usuario.findOne({ email: req.body.email, _id: { $ne: id } });
        if (emailExiste) return res.status(400).json({ msj: 'Email ya existe en otro usuario' });

        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        // usuario.password = req.body.password; // Opcional: permitir cambiar clave
        usuario.rol = req.body.rol;
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msj: 'Error al editar usuario', error });
    }
}

module.exports = { crearUsuario, listarUsuarios, editarUsuario };