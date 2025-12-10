const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    estado: { type: String, required: true, enum: ['Activo', 'Inactivo'] },
    password: { type: String, required: true }, // Nuevo requerimiento
    rol: { type: String, required: true, enum: ['administrador', 'docente'] }, // Nuevo requerimiento
    fechaCreacion: { type: Date, default: new Date() },
    fechaActualizacion: { type: Date, default: new Date() }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);