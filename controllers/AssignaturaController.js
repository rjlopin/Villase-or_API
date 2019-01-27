const models = require('../models');
const { check, validationResult } = require('express-validator/check');

exports.getAll = async (req, res)=>
{
    let resultats = await models.Assignatura.findAll();
    res.json(resultats);
};

exports.getByID = async (req, res)=>
{
    let resultat = await models.Assignatura.findOne(
        {
            where: {id: req.params.id},
            include: [{
                model: models.Alumne,
            }]
        });
    if (resultat){
        res.json(resultat);
    }else{
        res.json({});
    }
}

exports.Store = async (req, res) =>
{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
    }
    try
    {
        let resultat = await models.Assignatura.create({
            nom: req.body.nom,
            professor: req.body.professor
        });
        res.status(201).json({resultat: resultat});
    }catch(error)
    {
        res.status(400).json({error: error.original.sqlMessage});
    }
}

exports.Update = async (req, res) => 
{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
    }
    try{
        let resultat = await models.Assignatura.update({
            nom: req.body.nom,
            professor: req.body.professor,
        }, {
            where: {
                id: req.params.id
            }
        });
        if (resultat[0] == 0)
        {
            res.status(400).json({error: "Aquest resultat no existeix"});
        }
        let data = await models.Assignatura.find({ where: {id: req.params.id }});
        res.json({data});
    }catch(error)
    {
        res.status(400).json({error: error.original.sqlMessage});
    }
}

exports.Destroy = async (req, res) =>
{
    let resultat = await models.Assignatura.destroy({
        where: {
            id: req.params.id
        }
    });
    res.json({eliminats: resultat});
}