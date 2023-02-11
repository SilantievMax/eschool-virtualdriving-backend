import { Router } from 'express'
import checkAuth from '../utils/checkAuth.js'
import * as AuthController from '../controllers/authController.js'
import handleValidationErrors from '../utils/handleValidationErrors.js'
import { registerValidation, loginValidation, updateMeValidation } from '../validations/authValidations.js'

const router = new Router()

router.post('/register', registerValidation, handleValidationErrors, AuthController.register)
router.post('/login', loginValidation, handleValidationErrors, AuthController.login)
router.get('/me', checkAuth, AuthController.getMe)
router.patch('/me', checkAuth, updateMeValidation, handleValidationErrors, AuthController.updateMe)

export default router
