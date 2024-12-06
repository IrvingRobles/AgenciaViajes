const express = require('express');
//const cors = require('cors');
const path = require('path');
const session = require('express-session');
const db = require('./models/db'); // Conexión a la base de datos
const routes = require('./routes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cors({
//   origin:true,
//   credentials:true
// }));
const cors = require('cors');
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

// Configuración de archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// Rutas para las vistas HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/admin/admin-index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin', 'admin-index.html'));
});

app.use('/admin', (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
      next();
  } else {
      res.redirect('/login'); // Redirigir al login si no es administrador
  }
});

// Rutas para las vistas de administración
app.get('/admin/hoteles', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/admin', 'admin-hoteles.html'));
});

app.get('/admin/sitios-turisticos', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/admin', 'admin-sitios-turisticos.html'));
});

app.get('/admin/vuelos', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/admin', 'admin-vuelos.html'));
});


app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

// Agregar rutas para las demás páginas HTML
app.get('/hoteles', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'hoteles.html'));
});

app.get('/vuelos', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'vuelos.html'));
});

app.get('/sitios-turisticos', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'sitios-turisticos.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});


// Middleware de rutas para la API
app.use('/api', routes);

// Iniciar el servidor
app.listen(3000, '0.0.0.0', () => {
  console.log('Servidor corriendo en http://0.0.0.0:3000');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
