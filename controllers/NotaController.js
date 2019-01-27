const models = require('../models');
const { check, validationResult } = require('express-validator/check');

exports.Store = async (req, res) =>
{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
    }
    try
    {
        let resultat = await models.Notes.create({
            nota: req.body.nota,
            AlumneId: req.body.alumne_id,
            AssignaturaId: req.body.assignatura_id
        });
        res.status(201).json({resultat: resultat});
    }catch(error)
    {
        console.log(error);
        res.status(400).json({error: error.original.sqlMessage});
    }
}