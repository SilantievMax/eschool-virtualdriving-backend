import { Router } from 'express'
import checkAuth from '../utils/checkAuth.js'
import * as PaymentController from '../controllers/paymentController.js'

const router = new Router()

router.get('/', checkAuth, PaymentController.createPayment)
router.post('/yoomoney/notification', PaymentController.checkNotification)

export default router
