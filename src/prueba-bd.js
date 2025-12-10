// prueba-bd.js
require('dotenv').config(); // Cargar las variables del .env
const mongoose = require('mongoose');

const probarConexion = async () => {
    try {
        const url = process.env.MONGO_URI;
        
        console.log("Intentando conectar a Mongo...");
        
        if (!url) {
            throw new Error("❌ Error: No se encontró la variable MONGO_URI en el archivo .env");
        }

        // Intentar conectar
        await mongoose.connect(url);
        console.log("✅ ¡ÉXITO! Conexión establecida correctamente con MongoDB Atlas.");
        
        // Opcional: Ver el nombre de la base de datos conectada
        console.log(`📂 Conectado a la base de datos: ${mongoose.connection.name}`);

        // Cerrar la conexión para finalizar el script
        await mongoose.connection.close();
        console.log("🔌 Conexión cerrada.");

    } catch (error) {
        console.error("❌ FALLÓ LA CONEXIÓN:");
        console.error(error.message);
    }
}

probarConexion();