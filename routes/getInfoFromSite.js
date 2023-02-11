import { Router } from 'express'
import * as GetAllData from '../controllers/getInfoFromSite.js'

const router = new Router()

router.get('/setup', GetAllData.getNamesSetup)
router.get('/setup/:id', GetAllData.getSetup)
router.get('/car', GetAllData.getAllCar)
router.get('/track', GetAllData.getAllTrack)

export default router
