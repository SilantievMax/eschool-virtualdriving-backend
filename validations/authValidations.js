import { body } from "express-validator";

export const loginValidation = [body("email", "Неверный формат почты").isEmail()];

export const registerValidation = [
  body("fullName", "Имя должно быть минимум 3 символов").isLength({ min: 3 }),
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быить минимум 5 символов").isLength({
    min: 5,
  }),
  body("avatarUrl", "Неверная ссылка на аватарку").optional().isURL(),
];

export const updateMeValidation = [
  body("fullName", "Имя должно быть минимум 3 символов").isLength({ min: 3 }),
  // body('role', 'Роль не назначена').isLength({min: 2}),
  body("avatarUrl", "Неверная ссылка на аватарку").optional().isURL(),
];
