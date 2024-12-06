const db = require('./db');

// Realizar una reserva de hotel
exports.reservarHotel = (reservaData, callback) => {
    const { userId, hotelId, fechaEntrada, fechaSalida } = reservaData;
    const sql = 'INSERT INTO reservas (userId, hotelId, fechaEntrada, fechaSalida) VALUES (?, ?, ?, ?)';
    db.query(sql, [userId, hotelId, fechaEntrada, fechaSalida], (err, result) => {
        if (err) throw err;
        callback(result);
    });
};

// Actualizar una reserva (solo por administradores)
exports.updateReserva = (reservaId, newData, callback) => {
    const { hotelId, fechaEntrada, fechaSalida } = newData;
    const sql = 'UPDATE reservas SET hotelId = ?, fechaEntrada = ?, fechaSalida = ? WHERE id = ?';
    db.query(sql, [hotelId, fechaEntrada, fechaSalida, reservaId], (err, result) => {
        if (err) throw err;
        callback(result);
    });
};
