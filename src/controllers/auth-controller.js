const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        // 1. Validar que el usuario exista por email
        const usuario = await Usuario.findOne({ email: req.body.email });
        if (!usuario) {
            return res.status(400).json({ msj: 'Usuario no encontrado' });
        }

        // 2. Validar que el usuario esté activo (Opcional, pero recomendado)
        if (usuario.estado !== 'Activo') {
            return res.status(400).json({ msj: 'Usuario inactivo' });
        }

        // 3. Comparar contraseña (La que envían vs la encriptada en BD)
        const esIgual = await bcrypt.compare(req.body.password, usuario.password);
        if (!esIgual) {
            return res.status(400).json({ msj: 'Contraseña incorrecta' });
        }

        // 4. Generar el Token (JWT)
        const payload = {
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // 5. Responder con el usuario y el token
        res.json({
            usuario: { id: usuario._id, nombre: usuario.nombre, rol: usuario.rol },
            token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msj: 'Error en el servidor', error });
    }
}

module.exports = { login };