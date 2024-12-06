const bcrypt = require('bcrypt');
const db = require('./db');

// Función para crear un usuario
exports.createUser = (userData, callback) => {
    const { username, password, role } = userData;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    db.query(sql, [username, hashedPassword, role], (err, result) => {
        if (err) throw err;
        callback(result);
    });
};

// Función para obtener usuario por ID
exports.getUserById = (userId, callback) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [userId], (err, result) => {
        if (err) throw err;
        callback(result[0]);
    });
};

// Función para verificar si el usuario es admin
exports.isAdmin = (userId, callback) => {
    const sql = 'SELECT role FROM users WHERE id = ?';
    db.query(sql, [userId], (err, result) => {
        if (err) throw err;
        callback(result[0].role === 'admin');
    });
};
