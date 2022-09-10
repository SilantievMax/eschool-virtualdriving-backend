import { Router } from "express";
import { createTraining, getAllTraining, getOneTraining, removeTraining } from '../controllers/trainingController.js'
import { createSetup, getAllSetup, getOneSetup, removeSetup } from '../controllers/setupController.js'
import { createliveries, getAllLiveries, getOneLiveries, removeLiveries } from '../controllers/liveriesController.js'
// import { registerValidation, loginValidation } from "../validations/authValidations.js";
import checkAuth from '../utils/checkAuth.js'

const router = new Router();

router.get('/training/getall', getAllTraining);
router.get('/training/getone/:id', getOneTraining);
router.post('/training/create', checkAuth, createTraining);
router.delete('/training/remove/:id', checkAuth, removeTraining);
// router.patch('/training/update', updateTraining);

router.get('/setup/getall', getAllSetup);
router.get('/setup/getone/:id', getOneSetup);
router.post('/setup/create', checkAuth, createSetup);
router.delete('/setup/remove/:id', checkAuth, removeSetup);
// router.patch('/setup/update', updateTraining);

router.get('/liveries/getall', getAllLiveries);
router.get('/liveries/getone/:id', getOneLiveries);
router.post('/liveries/create', checkAuth, createliveries);
router.delete('/liveries/remove/:id', checkAuth, removeLiveries);
// router.patch('/liveries/update', updateTraining);

export default router;