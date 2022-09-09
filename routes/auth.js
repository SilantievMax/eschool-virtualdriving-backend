import { Router } from "express";
import { register, login, getMe} from '../controllers/authController.js'
import { registerValidation, loginValidation } from "../validations/authValidations.js";
import checkAuth from '../utils/checkAuth.js'

const router = new Router();

router.post('/register', registerValidation, register)
router.post('/login', loginValidation, login)
router.get('/me', checkAuth, getMe)

export default router;