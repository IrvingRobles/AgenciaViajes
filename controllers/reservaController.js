const Reserva = require('../models/Reserva');
const User = require('../models/User');

// Reservar un hotel (solo usuarios registrados)
exports.reservarHotel = (req, res) => {
    const { userId, hotelId, fechaEntrada, fechaSalida } = req.body;
    Reserva.reservarHotel({ userId, hotelId, fechaEntrada, fechaSalida }, (result) => {
        res.status(201).json({ message: 'Hotel reservado con éxito', reservaId: result.insertId });
    });
};

// Actualizar una reserva (solo administradores)
exports.updateReserva = (req, res) => {
    const { userId, reservaId, hotelId, fechaEntrada, fechaSalida } = req.body;
    User.isAdmin(userId, (isAdmin) => {
        if (!isAdmin) {
            return res.status(403).json({ message: 'No tienes permisos para esta acción' });
        }

        Reserva.updateReserva(reservaId, { hotelId, fechaEntrada, fechaSalida }, (result) => {
            res.status(200).json({ message: 'Reserva actualizada con éxito' });
        });
    });
};
