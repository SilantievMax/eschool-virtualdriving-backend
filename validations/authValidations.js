import { body } from 'express-validator';

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быить минимум 5 символов').isLength({min: 5}),
];

export const registerValidation = [
    body('fullName', 'Укажите имя').isLength({min: 3}),
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быить минимум 5 символов').isLength({min: 5}),
    // body('role', 'Роль не назначена').isLength({min: 2}),
    body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL()
];