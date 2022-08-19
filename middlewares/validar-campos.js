const { validationResult } = require("express-validator");

const validarCampos = ( req, res, next ) => {

    // Me traigo todos los errores del express validator del middleware check()
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json(errors)
    }

    next();
}

module.exports = {
    validarCampos
}