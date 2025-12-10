const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    estado: {
        type: String,
        required: true,
        enum: ['Activo', 'Inactivo']
    },
    // --- NUEVOS CAMPOS ---
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true,
        enum: ['administrador', 'docente'] // Validación estricta de roles
    },
    // ---------------------
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);