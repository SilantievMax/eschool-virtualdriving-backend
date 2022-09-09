import { Router } from "express";
import { createTraining } from '../controllers/trainingController.js'
import { createSetup } from '../controllers/setupController.js'
import { createliveries } from '../controllers/liveriesController.js'
// import { registerValidation, loginValidation } from "../validations/authValidations.js";
import checkAuth from '../utils/checkAuth.js'

const router = new Router();

// router.get('/training/', getAllTraining);
// router.get('/training/id', getOneTraining);
router.post('/trainingcreate', checkAuth, createTraining);
// router.delete('/training/', removeTraining);
// router.patch('/training/', updateTraining);

// router.get('/setup/', getAllTraining);
// router.get('/setup/id', getOneTraining);
router.post('/setupcreate', checkAuth, createSetup);
// router.delete('/setup/', removeTraining);
// router.patch('/setup/', updateTraining);

// router.get('/liveries/', getAllTraining);
// router.get('/liveries/id', getOneTraining);
router.post('/liveriescreate', checkAuth, createliveries);
// router.delete('/liveries/', removeTraining);
// router.patch('/liveries/', updateTraining);

export default router;