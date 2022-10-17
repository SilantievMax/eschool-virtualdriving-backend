import { Router } from "express";
import { createTraining, getAllTraining, getOneTraining, removeTraining, updateTraining } from '../controllers/trainingController.js'
import { createSetup, getAllSetup, getOneSetup, removeSetup, updateSetup } from '../controllers/setupController.js'
import { createliveries, getAllLiveries, getOneLiveries, removeLiveries, updateLiveries } from '../controllers/liveriesController.js'
// import { registerValidation, loginValidation } from "../validations/authValidations.js";
import checkAuth from '../utils/checkAuth.js'

const router = new Router();

router.post('/training/create', checkAuth, createTraining);
router.get('/training/getall', checkAuth, getAllTraining);
router.get('/training/getone/:id', checkAuth, getOneTraining);
router.delete('/training/remove/:id', checkAuth, removeTraining);
router.patch('/training/update/:id', checkAuth, updateTraining);

router.post('/setup/create', checkAuth, createSetup);
router.get('/setup/getall', checkAuth, getAllSetup);
router.get('/setup/getone/:id', getOneSetup);
router.delete('/setup/remove/:id', checkAuth, removeSetup);
router.patch('/setup/update/:id', checkAuth, updateSetup);

router.post('/liveries/create', checkAuth, createliveries);
router.get('/liveries/getall', getAllLiveries);
router.get('/liveries/getone/:id', getOneLiveries);
router.delete('/liveries/remove/:id', checkAuth, checkAuth, removeLiveries);
router.patch('/liveries/update/:id', checkAuth, updateLiveries);

export default router;