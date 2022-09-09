import { Router } from "express";
import { createTraining, getAllTraining, getOneTraining } from '../controllers/trainingController.js'
import { createSetup, getAllSetup, getOneSetup } from '../controllers/setupController.js'
import { createliveries, getAllLiveries, getOneLiveries } from '../controllers/liveriesController.js'
// import { registerValidation, loginValidation } from "../validations/authValidations.js";
import checkAuth from '../utils/checkAuth.js'

const router = new Router();

router.get('/training/getall', getAllTraining);
router.get('/training/getone/:id', getOneTraining);
router.post('/training/create', checkAuth, createTraining);
// router.delete('/training/remove', removeTraining);
// router.patch('/training/update', updateTraining);

router.get('/setup/getall', getAllSetup);
router.get('/setup/getone/:id', getOneSetup);
router.post('/setup/create', checkAuth, createSetup);
// router.delete('/setup/remove', removeTraining);
// router.patch('/setup/update', updateTraining);

router.get('/liveries/getall', getAllLiveries);
router.get('/liveries/getone/:id', getOneLiveries);
router.post('/liveries/create', checkAuth, createliveries);
// router.delete('/liveries/remove', removeTraining);
// router.patch('/liveries/update', updateTraining);

export default router;