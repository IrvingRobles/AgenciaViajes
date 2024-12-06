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

router.get('/admin/hoteles', hotelController.getAllHotels);
router.post('/admin/hoteles', hotelController.createHotel);
router.delete('/admin/hoteles/:id', hotelController.deleteHotel);

router.post('/admin/hoteles', hotelController.createHotel);
router.delete('/admin/hoteles/:id', hotelController.deleteHotel);
router.get('/hoteles', hotelController.getAllHotels);

// Rutas para vuelos

// Rutas de administración de vuelos
router.post('/admin/vuelos', vueloController.createVuelo);
router.get('/vuelos', vueloController.getAllVuelos);
router.delete('/admin/vuelos/:id', vueloController.deleteVuelo);


// Rutas para sitios turísticos
router.get('/sitios-turisticos', sitioTuristicoController.getAllSitiosTuristicos);
router.post('/admin/sitios-turisticos', sitioTuristicoController.createSitioTuristico);
router.delete('/admin/sitios-turisticos/:id', sitioTuristicoController.deleteSitioTuristico);

router.get('/sitios-turisticos', sitioTuristicoController.getAllSitiosTuristicos);
router.post('/admin/sitios-turisticos', sitioTuristicoController.createSitioTuristico);
router.delete('/admin/sitios-turisticos/:id', sitioTuristicoController.deleteSitioTuristico);


// Rutas para reservas
router.post('/reservas/hotel', reservaController.reservarHotel); // Usuarios
router.post('/reservas/update', reservaController.updateReserva); // Solo admin

router.get('/check-role', authController.checkRole);

module.exports = router;
