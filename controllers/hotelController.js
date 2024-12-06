const Hotel = require('../models/Hotel');

exports.getAllHotels = (req, res) => {
  Hotel.getAll((err, hotels) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los hoteles' });
    }
    res.json(hotels);
  });
};

exports.createHotel = (req, res) => {
  const { name, location, price, imagen_url } = req.body;

  if (!name || !location || !price || !imagen_url) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  Hotel.create(req.body, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear el hotel' });
    }
    res.status(201).json({ message: 'Hotel agregado con éxito' });
  });
};

exports.deleteHotel = (req, res) => {
  const { id } = req.params;

  Hotel.delete(id, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar el hotel' });
    }
    res.json({ message: 'Hotel eliminado con éxito' });
  });
};
