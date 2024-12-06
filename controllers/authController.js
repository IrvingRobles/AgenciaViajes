const bcrypt = require('bcrypt');
const db = require('../models/db');
const User = require('../models/User');

// Registro de usuario
// Función para registrar un nuevo usuario
// Registro de usuario
exports.register = (req, res) => {
    const { username, password, role } = req.body;

    // Verificar si el usuario ya existe
    const checkUserSql = 'SELECT * FROM users WHERE username = ?';
    db.query(checkUserSql, [username], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Cifrar la contraseña antes de guardar
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Insertar el nuevo usuario en la base de datos
        const sql = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
        db.query(sql, [username, hashedPassword, role], (err, result) => {
            if (err) throw err;

            // Redirigir al login después de registro exitoso con un mensaje de éxito en la URL
            res.redirect('/login?registered=true');
        });
    });
};



// Función para iniciar sesión
exports.login = (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) {
            console.error('Error en la base de datos:', err);
            return res.status(500).json({ message: 'Error en el servidor' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        const user = results[0];
        const passwordMatch = bcrypt.compareSync(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        req.session.user = {
            id: user.id,
            username: user.username,
            role: user.role
        };

        // Devuelve el rol del usuario junto con la respuesta de éxito
        res.status(200).json({ message: 'Login exitoso', user: req.session.user });
    });
};


exports.checkRole = (req, res) => {
    if (req.session.user) {
        res.json({ role: req.session.user.role });
    } else {
        res.status(401).json({ message: 'Usuario no autenticado' });
    }
};

  