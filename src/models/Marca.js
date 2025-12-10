const mongoose = require("mongoose");

const MarcaSchema = new mongoose.Schema({
    nombre: { type: String, required: true},
    estado: { type: String, required: true, enum: ["Activo", "inactivo"] },
    fechaCreacion: { type: Date, default: new Date()},
    fechaActualizacion: {type: Date, default: new Date() }
});

module.exports = mongoose.model("Marca", MarcaSchema);