const db = require('./db'); // Conexión a la base de datos

exports.getAll = (callback) => {
    db.query('SELECT * FROM vuelos', callback);
  };
  
  exports.create = (vueloData, callback) => {
    const { aerolinea, origen, destino, fecha, precio } = vueloData;
    db.query('INSERT INTO vuelos (aerolinea, origen, destino, fecha, precio) VALUES (?, ?, ?, ?, ?)', [aerolinea, origen, destino, fecha, precio], callback);
  };
  
  exports.update = (id, vueloData, callback) => {
    const { aerolinea, origen, destino, fecha, precio } = vueloData;
    db.query('UPDATE vuelos SET aerolinea = ?, origen = ?, destino = ?, fecha = ?, precio = ? WHERE id = ?', [aerolinea, origen, destino, fecha, precio, id], callback);
  };
  
  exports.delete = (id, callback) => {
    db.query('DELETE FROM vuelos WHERE id = ?', [id], callback);
  };