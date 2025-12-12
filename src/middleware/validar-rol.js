const jwt = require('jsonwebtoken');

// Middleware 1: Verificar que el Token sea válido
const validarJWT = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ msj: 'Error: No hay token en la petición' });
    }

    try {
        // payload tendrá los datos del usuario (id, rol, etc.)
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.payload = payload; // Guardamos los datos para usarlos abajo
        next(); // Dejar pasar
    } catch (error) {
        return res.status(401).json({ msj: 'Token no válido o expirado' });
    }
}

// Middleware 2: Verificar que sea Administrador
const esAdmin = (req, res, next) => {
    // Este middleware se ejecuta DESPUÉS de validarJWT, así que ya tenemos req.payload
    if (req.payload.rol !== 'administrador') {
        return res.status(403).json({ msj: 'Acceso denegado: Se requiere rol de Administrador' });
    }
    next();
}

module.exports = { validarJWT, esAdmin };