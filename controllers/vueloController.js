const Vuelo = require('../models/Vuelo');

exports.getAllVuelos = (req, res) => {
    Vuelo.getAll((err, vuelos) => {
      if (err) return res.status(500).json({ error: 'Error al obtener los vuelos' });
      res.json(vuelos);
    });
  };
  
  exports.createVuelo = (req, res) => {
    const { aerolinea, origen, destino, fecha, precio } = req.body;
    Vuelo.create({ aerolinea, origen, destino, fecha, precio }, (err, vueloId) => {
      if (err) return res.status(500).json({ error: 'Error al crear el vuelo' });
      res.status(201).json({ message: 'Vuelo creado con éxito', vueloId });
    });
  };
  
  exports.updateVuelo = (req, res) => {
    const { id } = req.params;
    const { aerolinea, origen, destino, fecha, precio } = req.body;
    Vuelo.update(id, { aerolinea, origen, destino, fecha, precio }, (err) => {
      if (err) return res.status(500).json({ error: 'Error al actualizar el vuelo' });
      res.json({ message: 'Vuelo actualizado con éxito' });
    });
  };

  exports.deleteVuelo = (req, res) => {
    const { id } = req.params;
    Vuelo.delete(id, (err) => {
      if (err) return res.status(500).json({ error: 'Error al eliminar el vuelo' });
      res.json({ message: 'Vuelo eliminado con éxito' });
    });
  };