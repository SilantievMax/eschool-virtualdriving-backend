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

// Swagger
/** POST Methods */
/**
 * @openapi
 * /api/auth/register:
 *  post:
 *     tags:
 *     - Auth Controller
 *     summary: Регистрация пользователя
 *     requestBody:
 *      required: false
 *      content:
 *        application/json:
 *           schema:
 *            properties:
 *              email:
 *                type: string
 *                default: test@test.com
 *              password:
 *                type: string
 *                default: qwerty1234
 *              fullName:
 *                type: string
 *                default: Силантьев Максим
 */

/** POST Methods */
/**
 * @openapi
 * '/api/auth/login':
 *  post:
 *     tags:
 *     - Auth Controller
 *     summary: Авторизация пользователя
 *     requestBody:
 *      required: false
 *      content:
 *        application/json:
 *           schema:
 *            properties:
 *              email:
 *                type: string
 *                default: test@test.com
 *              password:
 *                type: string
 *                default: qwerty1234
 */

/** GET Methods */
/**
 * @openapi
 * '/api/auth/me':
 *  get:
 *     tags:
 *     - Auth Controller
 *     summary: Получение данных о пользователе
 */

/** PUT Methods */
/**
 * @openapi
 * '/api/auth/me':
 *  patch:
 *     tags:
 *     - Auth Controller
 *     summary: Изменение данных профиля
 *     requestBody:
 *      required: false
 *      content:
 *        application/json:
 *           schema:
 *            properties:
 *              avatarUrl:
 *                type: string
 *                default: test@test.com
 *              password:
 *                type: string
 *                default: qwerty1234
 *              fullName:
 *                type: string
 *                default: Силантьев Максим
 */
