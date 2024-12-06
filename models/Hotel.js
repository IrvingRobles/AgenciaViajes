const db = require('./db');

const Hotel = {
  getAll: (callback) => {
    db.query('SELECT * FROM hoteles', callback);
  },

  create: (hotel, callback) => {
    const { name, location, price, imagen_url } = hotel;
    db.query(
      'INSERT INTO hoteles (name, location, price, imagen_url) VALUES (?, ?, ?, ?)',
      [name, location, price, imagen_url],
      callback
    );
  },

  delete: (id, callback) => {
    db.query('DELETE FROM hoteles WHERE id = ?', [id], callback);
  },
};

module.exports = Hotel;
