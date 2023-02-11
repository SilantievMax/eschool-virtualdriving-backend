import { body } from 'express-validator'

export const trainingCreateValidation = [
	body('orderNumber', 'Укажите имя').isLength({ min: 3 }),
	body('orderName', 'Укажите имя').isLength({ min: 3 }),
	body('communications', 'Укажите имя').isLength({ min: 3 }),
	body('orderDate', 'Укажите имя').isLength({ min: 3 }),
	body('car', 'Укажите имя').isLength({ min: 3 }),
	body('track', 'Укажите имя').isLength({ min: 3 }),
	body('experience', 'Укажите имя').isLength({ min: 3 }),
	body('files', 'Укажите имя').isLength({ min: 3 }),
	body('coment', 'Укажите имя').isLength({ min: 3 }),
	body('equipment', 'Укажите имя').isLength({ min: 3 }),
	body('executor', 'Укажите имя').isLength({ min: 3 }),
	body('price', 'Укажите имя').isLength({ min: 3 }),
	body('status', 'Укажите имя').isLength({ min: 3 }),
	body('email', 'Неверный формат почты').isEmail(),
	body('password', 'Пароль должен быить минимум 5 символов').isLength({ min: 5 }),
	body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL()
]

export const setupCreateValidation = [
	body('orderNumber', 'Укажите имя').isLength({ min: 3 }),
	body('orderName', 'Укажите имя').isLength({ min: 3 }),
	body('communications', 'Укажите имя').isLength({ min: 3 }),
	body('orderDate', 'Укажите имя').isLength({ min: 3 }),
	body('car', 'Укажите имя').isLength({ min: 3 }),
	body('track', 'Укажите имя').isLength({ min: 3 }),
	body('experience', 'Укажите имя').isLength({ min: 3 }),
	body('files', 'Укажите имя').isLength({ min: 3 }),
	body('coment', 'Укажите имя').isLength({ min: 3 }),
	body('equipment', 'Укажите имя').isLength({ min: 3 }),
	body('executor', 'Укажите имя').isLength({ min: 3 }),
	body('price', 'Укажите имя').isLength({ min: 3 }),
	body('status', 'Укажите имя').isLength({ min: 3 }),
	body('email', 'Неверный формат почты').isEmail(),
	body('password', 'Пароль должен быить минимум 5 символов').isLength({ min: 5 }),
	body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL()
]

export const liveriesCreateValidation = [
	body('orderNumber', 'Укажите имя').isLength({ min: 3 }),
	body('orderName', 'Укажите имя').isLength({ min: 3 }),
	body('communications', 'Укажите имя').isLength({ min: 3 }),
	body('orderDate', 'Укажите имя').isLength({ min: 3 }),
	body('car', 'Укажите имя').isLength({ min: 3 }),
	body('track', 'Укажите имя').isLength({ min: 3 }),
	body('experience', 'Укажите имя').isLength({ min: 3 }),
	body('files', 'Укажите имя').isLength({ min: 3 }),
	body('coment', 'Укажите имя').isLength({ min: 3 }),
	body('equipment', 'Укажите имя').isLength({ min: 3 }),
	body('executor', 'Укажите имя').isLength({ min: 3 }),
	body('price', 'Укажите имя').isLength({ min: 3 }),
	body('status', 'Укажите имя').isLength({ min: 3 }),
	body('email', 'Неверный формат почты').isEmail(),
	body('password', 'Пароль должен быить минимум 5 символов').isLength({ min: 5 }),
	body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL()
]
