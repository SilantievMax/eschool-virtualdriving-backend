import { Router } from 'express'
import checkAuth from '../utils/checkAuth.js'
import checkRole from '../utils/checkRole.js'
import * as StatisticController from '../controllers/statisticsController.js'


const router = new Router()

router.get('/orders', StatisticController.getCountOrders)

export default router