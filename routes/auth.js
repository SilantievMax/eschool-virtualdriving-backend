import { Router } from 'express';
import * as AuthController from '../controllers/authController.js';
import { registerValidation, loginValidation, updateMeValidation } from '../validations/authValidations.js';
import checkAuth from '../utils/checkAuth.js';
import passport from 'passport';
import handleValidationErrors from '../utils/handleValidationErrors.js';

const router = new Router();

router.post('/register', registerValidation, handleValidationErrors, AuthController.register);
router.post('/login', loginValidation, handleValidationErrors, AuthController.login);
router.get('/me', checkAuth, AuthController.getMe);
router.patch('/me', checkAuth, updateMeValidation, handleValidationErrors, AuthController.updateMe);
router.get('/discord', passport.authenticate('discord')); //Перенаправление на api discord
router.get('/redirect', passport.authenticate('discord', {
    failureRedirect: '/forbidden',
    successRedirect: '/dashboard'
}), AuthController.redirectDiscord);

export default router;