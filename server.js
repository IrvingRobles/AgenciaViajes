const express = require('express');
const cors = require('cors');
const session = require('express-session');
const routes = require('./routes'); // Aquí se define que las rutas serán solo en '/api'
require('dotenv').config();

const app = express();

// Middleware de configuración
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración CORS para permitir solicitudes desde cualquier origen
app.use(cors({
  origin: '*', // Permite solicitudes desde cualquier origen
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Encabezados permitidos
}));

// Configuración de sesión
app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Si es HTTP, debe ser false
}));

// Rutas de la API en la ruta raíz '/api'
app.use('/api', routes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor API corriendo en el puerto ${PORT}`);
});
