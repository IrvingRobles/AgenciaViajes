const mysql = require('mysql2');

// Crear conexión a la base de datos
const db = mysql.createConnection({
    host: 'b31ppzw52u61v7kagevi-mysql.services.clever-cloud.com',
    user: 'ubukm91kpwkclqdo', 
    password: '3Nq8ObLr93WU2XbQsiex', 
    database: 'b31ppzw52u61v7kagevi' // Nombre de la base de datos
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        throw err;
    }
    console.log('Conectado a la base de datos MySQL');
});

module.exports = db;
