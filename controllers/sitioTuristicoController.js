const SitioTuristico = require('../models/SitioTuristico');

exports.getAllSitiosTuristicos = (req, res) => {
  SitioTuristico.getAll((err, sitios) => {
    if (err) return res.status(500).json({ error: 'Error al obtener los sitios turísticos' });
    res.json(sitios);
  });
};

exports.createSitioTuristico = (req, res) => {
  const { name, location, description, imageUrl } = req.body;
  SitioTuristico.create({ name, location, description, imageUrl }, (err, sitioId) => {
    if (err) return res.status(500).json({ error: 'Error al crear el sitio turístico' });
    res.status(201).json({ message: 'Sitio turístico creado con éxito', sitioId });
  });
};

exports.deleteSitioTuristico = (req, res) => {
  const { id } = req.params;
  SitioTuristico.delete(id, (err) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar el sitio turístico' });
    res.json({ message: 'Sitio turístico eliminado con éxito' });
  });
};
