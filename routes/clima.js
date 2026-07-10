require('dotenv').config(); 
const express = require('express');
const router = express.Router();
const { param, validationResult } = require('express-validator');
const { obtenerClima } = require('../services/clima');

// GET /api/clima/:ciudad
router.get('/:ciudad', 
    param('ciudad').isAlpha().withMessage('La ciudad solo debe contener letras'),
    async (req, res) => {
        // Validar errores
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ errores: errores.array() });
        }

        try {
            const clima = await obtenerClima(req.params.ciudad);
            res.status(200).json(clima);
        } catch (error) {
            // Si el servicio externo falla, devolvemos 502
            res.status(502).json({ error: error.message });
        }
    }
);

module.exports = router;