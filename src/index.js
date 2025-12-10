const express = require('express');
const { getConnection } = require('./db/db-connection-mongo');
const cors = require('cors');
const path = require('path'); // 1. Importar módulo path

// 2. Configurar dotenv apuntando a la misma carpeta (__dirname)
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const app = express();
const port = process.env.PORT || 4000;

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- Conexión a Base de Datos ---
getConnection();

// --- Rutas ---
app.use('/usuarios', require('./routes/usuario-route'));
app.use('/inventarios', require('./routes/inventario-route'));

// --- Iniciar Servidor ---
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});