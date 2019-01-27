const { check, validationResult } = require('express-validator/check');

module.exports = {
    store: [
        check('alumne_id').exists().isNumeric(),
        check('assignatura_id').exists().isNumeric(),
        check('nota').exists().isNumeric()
    ]
}