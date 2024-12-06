const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const hotelController = require('../controllers/hotelController');
const vueloController = require('../controllers/vueloController');
const reservaController = require('../controllers/reservaController');
const sitioTuristicoController = require('../controllers/sitioTuristicoController');

// Rutas de autenticación
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/check-role', authController.checkRole);

// Rutas de hoteles
router.get('/hoteles', hotelController.getAllHotels);
router.post('/admin/hoteles', hotelController.createHotel);
router.delete('/admin/hoteles/:id', hotelController.deleteHotel);

// Rutas de vuelos
router.get('/vuelos', vueloController.getAllVuelos);
router.post('/admin/vuelos', vueloController.createVuelo);
router.delete('/admin/vuelos/:id', vueloController.deleteVuelo);

// Rutas de sitios turísticos
router.get('/sitios-turisticos', sitioTuristicoController.getAllSitiosTuristicos);
router.post('/admin/sitios-turisticos', sitioTuristicoController.createSitioTuristico);
router.delete('/admin/sitios-turisticos/:id', sitioTuristicoController.deleteSitioTuristico);

// Rutas de reservas
router.post('/reservas/hotel', reservaController.reservarHotel);
router.post('/reservas/update', reservaController.updateReserva);

module.exports = router;
