const { Router } = require('express');
const { check } = require('express-validator');
const { getAdminUsers, putUsers, postUsers, deleteUsers, postInmuebles, editInmueble, getUsers, getUserByUsername } = require('../controllers/users.controller');
const { isValidRole, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const validarMongoID = require('../middlewares/validar-mongoid');
const validarRepetidoID = require('../middlewares/validar-idrepetido');

const router = Router();

// /api/users

// GET all users with ADMIN role
router.get('/alladmins', getAdminUsers);
// GET all users with USER role
router.get('/allusers', getUsers);

// GET one user info by his username
router.get('/username', getUserByUsername);

// EDITS a property's thumbnail in particular
router.put('/inmueble/:id', editInmueble);

router.put('/:id', putUsers);

router.post('/register', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password tiene que tener mas de 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('rol').custom( isValidRole ),
    validarCampos
], postUsers);

router.post('/:id/addinmueble', [
    check('inmuebleID', 'No es un ID valido').isMongoId(),
    // check('rol').custom( isValidRole ),
    validarMongoID,
    validarRepetidoID,
    validarCampos
], postInmuebles);

router.delete('/delete/:id',[
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], deleteUsers);

module.exports = router;