const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs'); // Importamos la librería de seguridad

// CREAR USUARIO (Con encriptación)
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
        usuario.rol = req.body.rol;

        // --- INICIO DE ENCRIPTACIÓN ---
        const salt = await bcrypt.genSalt(10); // Generar "sal" (aleatoriedad)
        const password = req.body.password;
        usuario.password = await bcrypt.hash(password, salt); // Encriptar
        // --- FIN DE ENCRIPTACIÓN ---

        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();
        res.status(201).json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msj: 'Error al crear usuario', error: error.message });
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

// EDITAR USUARIO (Manejo inteligente de contraseña)
const editarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        let usuario = await Usuario.findById(id);
        if (!usuario) return res.status(404).json({ msj: 'Usuario no existe' });

        const emailExiste = await Usuario.findOne({ email: req.body.email, _id: { $ne: id } });
        if (emailExiste) return res.status(400).json({ msj: 'Email ya existe en otro usuario' });

        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.rol = req.body.rol;
        
        // Solo encriptamos si enviaron una contraseña nueva
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            usuario.password = await bcrypt.hash(req.body.password, salt);
        }

        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msj: 'Error al editar usuario', error });
    }
}

module.exports = { crearUsuario, listarUsuarios, editarUsuario };