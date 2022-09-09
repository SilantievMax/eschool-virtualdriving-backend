import { Router } from "express";
import { createTraining } from '../controllers/trainingController.js'
import { createSetup } from '../controllers/setupController.js'
import { createliveries } from '../controllers/liveriesController.js'
// import { registerValidation, loginValidation } from "../validations/authValidations.js";
import checkAuth from '../utils/checkAuth.js'

const router = new Router();

// router.get('/training/getall', getAllTraining);
// router.get('/training/getone/:id', getOneTraining);
router.post('/training/create', checkAuth, createTraining);
// router.delete('/training/remove', removeTraining);
// router.patch('/training/update', updateTraining);

// router.get('/setup/getall', getAllTraining);
// router.get('/setup/getone/:id', getOneTraining);
router.post('/setup/create', checkAuth, createSetup);
// router.delete('/setup/remove', removeTraining);
// router.patch('/setup/update', updateTraining);

// router.get('/liveries/getall', getAllTraining);
// router.get('/liveries/getone/:id', getOneTraining);
router.post('/liveries/create', checkAuth, createliveries);
// router.delete('/liveries/remove', removeTraining);
// router.patch('/liveries/update', updateTraining);

export default router;