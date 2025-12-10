const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        const url = process.env.MONGO_URI; // ¡Aquí está la magia!
        
        if (!url) {
             throw new Error("La URL de Mongo no está definida en el .env");
        }

        await mongoose.connect(url);
        console.log('Conexión exitosa a Mongo');
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getConnection };