const mongoose = require('mongoose');

const TipoEquipoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true,
        enum: ['Activo', 'Inactivo']
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('TipoEquipo', TipoEquipoSchema);