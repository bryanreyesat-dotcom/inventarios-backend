const mongoose = require("mongoose");

const EstadoEquipoSchema = new mongoose.Schema({
    nombre: {type: String, require: true},
    estado: {type: String, require: true, enum: [ "Activo", "Inactivo"] },
    fechaCreacion: { type: Date, default: new Date()},
    fechaActualizacion: { type: Date, default: new Date() }
});

module.exports = mongoose.model("EstadoEquipo", EstadoEquipoSchema);