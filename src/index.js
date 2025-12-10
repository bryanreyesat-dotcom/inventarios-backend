const express = require('express');
const { getConnection } = require('./db/db-connection-mongo');
const cors = require('cors');
require('dotenv').config(); // Carga las variables de entorno del archivo .env

const app = express();
const port = process.env.PORT || 4000;

// --- Middlewares ---
app.use(cors()); // Permite peticiones desde otros orígenes (Frontend)
app.use(express.json()); // Habilita recibir datos en formato JSON

// --- Conexión a Base de Datos ---
getConnection();

// --- Rutas ---
// 1. Módulo de Usuarios
app.use('/usuarios', require('./routes/usuario-route'));

// 2. Módulo de Inventarios
app.use('/inventarios', require('./routes/inventario-route'));

// 3. Módulo de Marcas (Nuevo)
app.use('/marcas', require('./routes/marca-route'));

// 4. Módulo de Estados de Equipo (Nuevo)
app.use('/estados-equipos', require('./routes/estado-equipo-route'));

// 5. Módulo de Tipos de Equipo (Nuevo)
app.use('/tipos-equipos', require('./routes/tipo-equipo-route'));


// --- Iniciar Servidor ---
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});