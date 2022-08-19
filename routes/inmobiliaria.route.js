const { Router } = require('express');
const { check } = require('express-validator');
const { postInmobiliaria } = require('../controllers/categorias.controller');

const router = Router();

/**
 * {{url}}/api/categorias
 */

//  Obtener todas las categorias - publico
router.get('/', (req, res) => { res.json( "get" )  });

// Obtener una categoria por id - publico
router.get('/:id', (req, res) => { res.json( "get ID" )} );

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', postInmobiliaria );

// Actualizar - privado - cualquiera con token válido
router.put('/:id', (req, res) => { res.json( "put" )} );

// Borrar una categoria - Admin
router.delete('/:id', (req, res) => { res.json( "put" )} );



module.exports = router;