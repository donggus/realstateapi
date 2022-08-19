const { Router } = require('express');
const { check } = require('express-validator');
const { registrarInmueble, getInfoInmueble, getInmueblePorInmobiliaria, getInmueblesByID } = require('../controllers/inmueble.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//  /api/inmuebles

router.post('/register', registrarInmueble);
router.get('/info/:id', getInfoInmueble);
router.get('/inmobiliaria', getInmueblePorInmobiliaria);
router.get('/:id', getInmueblesByID);

module.exports = router;