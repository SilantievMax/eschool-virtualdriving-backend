import { Router } from "express";
import checkAuth from '../utils/checkAuth.js'
import checkRole from "../utils/checkRole.js";
import * as TrainingController from '../controllers/trainingController.js'
import * as SetupController from '../controllers/setupController.js'
import * as LiveriesController from '../controllers/liveriesController.js'

const router = new Router();

router.post('/training', checkAuth, TrainingController.createTraining);
router.get('/training', checkAuth, checkRole(["SUPERADMIN"]), TrainingController.getAllTraining);
router.get('/training/user', checkAuth, checkRole(["USER"]), TrainingController.getAllTrainingUser); 
router.get('/training/:id', checkAuth, TrainingController.getOneTraining);
router.delete('/training/:id', checkAuth, TrainingController.removeTraining);
router.patch('/training/:id', checkAuth, TrainingController.updateTraining);

router.post('/setup/create', checkAuth, SetupController.createSetup);
router.get('/setup/getall', checkAuth, SetupController.getAllSetup);
router.get('/setup/getone/:id', checkAuth, SetupController.getOneSetup);
router.delete('/setup/remove/:id', checkAuth, SetupController.removeSetup);
router.patch('/setup/update/:id', checkAuth, SetupController.updateSetup);

router.post('/liveries/create', checkAuth, LiveriesController.createliveries);
router.get('/liveries/getall', checkAuth, LiveriesController.getAllLiveries);
router.get('/liveries/getone/:id', checkAuth, LiveriesController.getOneLiveries);
router.delete('/liveries/remove/:id', checkAuth, LiveriesController.removeLiveries);
router.patch('/liveries/update/:id', checkAuth, LiveriesController.updateLiveries);

export default router;