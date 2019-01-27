const { check, validationResult } = require('express-validator/check');

module.exports= {
    store: [
        check('nom').exists(),
        check('professor').exists()
    ],
    update: [
        check('nom').exists(),
        check('professor').exists()
    ]
}