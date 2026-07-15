require('dotenv').config();
const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const { body, validationResult } = require('express-validator');


app.use(helmet());              // cabeceras de seguridad HTTP
app.use(express.json());        // parseo seguro de JSON
app.use(morgan('dev'));         // bitácora de peticiones

// Ruta de prueba con validación de entrada
app.post(
  '/api/echo',
  body('mensaje').isString().trim().isLength({ min: 1, max: 200 }).escape(),
  (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    res.json({ recibido: req.body.mensaje });
  }
);

app.get('/api/salud', (req, res) => {
  res.json({ status: 'ok' });
});


module.exports = app;

app.post(
  '/api/registro',
  [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio').trim().escape(),
    body('correo').isEmail().withMessage('Debe ser un correo electrónico válido').normalizeEmail()
  ],
  (req, res) => {
   /* JUSTIFICACIÓN DE CODIFICACIÓN SEGURA:
       Principio aplicado: Validación de Entradas (Input Validation).
       
       Al utilizar isEmail() y notEmpty(), garantizamos que los datos procesados cumplen 
       con el formato esperado antes de llegar a la lógica de negocio. Esto previene 
       ataques de inyección (como XSS) y asegura la integridad de los datos, cumpliendo 
       con la premisa de nunca confiar en la entrada del usuario:)
    */
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    
    const { nombre, correo } = req.body;
    res.json({ mensaje: "Usuario registrado correctamente", usuario: { nombre, correo } });
  }
);


const authRouter = require('./routes/auth');
const verificarToken = require('./middleware/auth');
const tareasRouter = require('./routes/tareas');
const climaRouter = require('./routes/clima');

app.use('/api/auth', authRouter);

app.use('/api/tareas', verificarToken, tareasRouter);

app.use('/api/clima',verificarToken,climaRouter);


