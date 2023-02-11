import { Router } from 'express'
import checkAuth from '../utils/checkAuth.js'
import checkRole from '../utils/checkRole.js'
import * as TrainingController from '../controllers/trainingController.js'
import * as SetupController from '../controllers/setupController.js'
import * as LiveriesController from '../controllers/liveriesController.js'

const router = new Router()

router.post('/training', checkAuth, TrainingController.createTraining)
router.get('/training', checkAuth, checkRole(['SUPERADMIN']), TrainingController.getAllTraining)
router.get('/training/user', checkAuth, checkRole(['USER']), TrainingController.getAllTrainingUser)
router.get('/training/:id', checkAuth, TrainingController.getOneTraining)
router.delete('/training/:id', checkAuth, checkRole(['SUPERADMIN']), TrainingController.removeTraining)
router.patch('/training/:id', checkAuth, checkRole(['SUPERADMIN']), TrainingController.updateTraining)

router.post('/setup/:idsetup', checkAuth, SetupController.createSetup)
router.get('/setup', checkAuth, checkRole(['SUPERADMIN']), SetupController.getAllSetup)
router.get('/setup/user', checkAuth, checkRole(['USER']), SetupController.getAllSetupUser)
router.get('/setup/:id', checkAuth, SetupController.getOneSetup)
router.delete('/setup/:id', checkAuth, checkRole(['SUPERADMIN']), SetupController.removeSetup)
router.patch('/setup/:id', checkAuth, checkRole(['SUPERADMIN']), SetupController.updateSetup)

router.post('/liveries', checkAuth, LiveriesController.createLiveries)
router.get('/liveries', checkAuth, checkRole(['SUPERADMIN']), LiveriesController.getAllLiveries)
router.get('/liveries/:id', checkAuth, LiveriesController.getOneLiveries)
router.delete('/liveries/:id', checkAuth, LiveriesController.removeLiveries)
router.patch('/liveries/:id', checkAuth, LiveriesController.updateLiveries)

export default router
