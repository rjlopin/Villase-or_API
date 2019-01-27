const models = require('../models');
const { check, validationResult } = require('express-validator/check');

exports.getAll = async (req, res)=>
{
    let resultats = await models.Alumne.findAll();
    res.json(resultats);
};

exports.getByID = async (req, res)=>
{
    let resultat = await models.Alumne.findOne(
        {
            where: {id: req.params.id},
            include: [{
                model: models.Assignatura,
                include: [{
                    model: models.Notes
                }]
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
        let resultat = await models.Alumne.create({
            nom: req.body.nom,
            cognoms: req.body.cognoms,
            mail: req.body.mail
        });
        res.status(201).json({resultat: resultat});
    }catch(error)
    {
        res.status(400).json({error: error.original.sqlMessage});
    }
}

exports.storeAssignatura = async (req, res) =>
{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
    }
    try
    {
        let alumne = await models.Alumne.findByPk(req.body.alumne_id);
        let assignatura = await models.Assignatura.findByPk(req.body.alumne_id);
        let resultat = await alumne.addAssignatura(assignatura);
        res.status(200).json({resultat: resultat});
    }catch(error)
    {
        console.log(error);
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
        let resultat = await models.Alumne.update({
            nom: req.body.nom,
            cognoms: req.body.cognoms,
            mail: req.body.mail
        }, {
            where: {
                id: req.params.id
            }
        });
        if (resultat[0] == 0)
        {
            res.status(400).json({error: "Aquest resultat no existeix"});
        }
        let data = await models.Alumne.findOne({ where: {id: req.params.id }});
        res.json({data});
    }catch(error)
    {
        res.status(400).json({error: error.original.sqlMessage});
    }
}

exports.Destroy = async (req, res) =>
{
    let resultat = await models.Alumne.destroy({
        where: {
            id: req.params.id
        }
    });
    res.json({eliminats: resultat});
}