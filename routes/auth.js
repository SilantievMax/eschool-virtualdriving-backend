import { Router } from 'express';
import { register, login, getMe, redirectDiscord, updateMe} from '../controllers/authController.js';
import { registerValidation, loginValidation, updateMeValidation } from '../validations/authValidations.js';
import checkAuth from '../utils/checkAuth.js';
import passport from 'passport';

const router = new Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/me', checkAuth, getMe);
router.patch('/me', updateMeValidation, checkAuth, updateMe);
router.get('/discord', passport.authenticate('discord')); //Перенаправление на api discord
router.get('/redirect', passport.authenticate('discord', {
    failureRedirect: '/forbidden',
    successRedirect: '/dashboard'
}), redirectDiscord);

export default router;