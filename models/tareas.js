const express = require('express');
const router = express.Router();
const tareasModel = require('../models/tareasModel'); // Ajusta tu ruta

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    
    // Suponiendo que tareasModel.eliminar es tu función
    const eliminada = tareasModel.eliminar(id); 

    if (eliminada) {
        // Código 204: Éxito, pero no hay contenido que devolver
        return res.status(204).send(); 
    } else {
        // Código 404: No se encontró el recurso solicitado()
        return res.status(404).json({ error: "Tarea no encontrada" });
    }
});

module.exports = router;