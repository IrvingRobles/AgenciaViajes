const db = require('./db'); // Conexión a la base de datos



exports.getAll = (callback) => {
  db.query('SELECT * FROM sitios_turisticos', callback);
};

exports.create = (sitioData, callback) => {
  const { name, location, description, imageUrl } = sitioData;
  db.query('INSERT INTO sitios_turisticos (name, location, description, image_url) VALUES (?, ?, ?, ?)', [name, location, description, imageUrl], callback);
};

exports.update = (id, sitioData, callback) => {
  const { name, location, description, imageUrl } = sitioData;
  db.query('UPDATE sitios_turisticos SET name = ?, location = ?, description = ?, image_url = ? WHERE id = ?', [name, location, description, imageUrl, id], callback);
};

exports.delete = (id, callback) => {
  db.query('DELETE FROM sitios_turisticos WHERE id = ?', [id], callback);
};