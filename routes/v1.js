var express = require('express');
var router = express.Router();
var expressListRoutes   = require('express-list-routes');
const { check, validationResult } = require('express-validator/check');
var AlumneController = require('../controllers/AlumneController');
var AssignaturaController = require('../controllers/AssignaturaController');
var NotaController = require('../controllers/NotaController');
var AlumneRequest = require('../Requests/Alumne');
var AssignaturaRequests = require('../Requests/Assignatura');
var NotaRequest = require('../Requests/Nota');
/* Alumnes */
router.get('/alumnes', AlumneController.getAll);
router.get('/alumne/:id', AlumneController.getByID);
router.post('/alumne', AlumneRequest.store ,AlumneController.Store);
router.put('/alumne/:id', AlumneRequest.update, AlumneController.Update);
router.delete('/alumne/:id', AlumneController.Destroy);
/* Assignatures */
router.get('/assignatures', AssignaturaController.getAll);
router.get('/assignatura/:id', AssignaturaController.getByID);
router.post('/assignatura', AssignaturaRequests.store ,AssignaturaController.Store);
router.put('/assignatura/:id', AssignaturaRequests.update, AssignaturaController.Update);
router.delete('/assignatura/:id', AssignaturaController.Destroy);
/* Notes */
router.post('/nota', NotaRequest.store, NotaController.Store );
/* Vincular assignatures */
router.post('/vincular', AlumneRequest.storeAssignatua, AlumneController.storeAssignatura);

/*
expressListRoutes({ prefix: '/api/v1' }, 'API:', router );
*/

module.exports = router;
