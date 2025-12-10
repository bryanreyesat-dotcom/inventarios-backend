const Marca = require('../models/Marca');

const crearMarca = async (req, res) => {
    try {
        let marca = new Marca();
        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaCreacion = new Date();
        marca.fechaActualizacion = new Date();
        marca = await marca.save();
        res.send(marca);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
}

const listarMarcas = async (req, res) => {
    try {
        const marcas = await Marca.find();
        res.json(marcas);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
}

const editarMarca = async (req, res) => {
    try {
        const { id } = req.params;
        let marca = await Marca.findById(id);
        if (!marca) return res.status(404).send('Marca no existe');
        
        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaActualizacion = new Date();

        marca = await marca.save();
        res.send(marca);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
}

module.exports = { crearMarca, listarMarcas, editarMarca };