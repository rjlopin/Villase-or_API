const { check, validationResult } = require('express-validator/check');

module.exports = {
    store: [
        check('nom').exists(),
        check('cognoms').exists(),
        check('mail').exists().isEmail(),
    ],
    update: [
        check('nom').exists(),
        check('cognoms').exists(),
        check('mail').exists().isEmail(),
    ],
    storeAssignatua: [
        check('alumne_id').exists().isNumeric(),
        check('assignatura_id').exists().isNumeric()
    ]
}