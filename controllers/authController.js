import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModel from '../models/User.js'
import { rejects } from 'assert'
import { contextsKey } from 'express-validator/src/base.js'

const passwordHashing = async pass => {
	const salt = await bcrypt.genSalt(10)
	const hash = await bcrypt.hash(pass.trim(), salt)
	return hash
}

export const register = async (req, res) => {
	try {
		const JWT_SECRET = process.env.JWT_SECRET

		const candidate = await UserModel.findOne({ email: req.body.email }).populate('refPartner')

		if (candidate) {
			return res.status(203).json({ message: 'Такая почта уже есть в базе' })
		}

		const password = req.body.password
		const hash = await passwordHashing(password)
		const checkReflink = req.body.refPartner

		const doc = new UserModel({
			fullName: req.body.fullName,
			email: req.body.email,
			passwordHash: hash,
			role: req.body.role,
			avatarUrl: req.body.avatarUrl,
			refPartner: checkReflink ? checkReflink : undefined
		})

		const user = await doc.save()

		const token = jwt.sign(
			{
				id: user._id,
				role: user.role
			},
			JWT_SECRET,
			{ expiresIn: '2d' }
		)

		const { passwordHash, ...userData } = user._doc

		res.status(201).json({
			...userData,
			token,
			message: 'Регистрация прошла успешно'
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось зарегистрироваться!'
		})
	}
}

export const login = async (req, res) => {
	try {
		const JWT_SECRET = process.env.JWT_SECRET

		const user = await UserModel.findOne({ email: req.body.email })

		if (!user) {
			return res.status(203).json({
				message: 'Пользователь не найден'
			})
		}

		const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)

		if (!isValidPass) {
			return res.status(203).json({
				message: 'Неверный пароль или логин'
			})
		}

		const token = jwt.sign(
			{
				id: user._id,
				role: user.role
			},
			JWT_SECRET,
			{ expiresIn: '2d' }
		)

		const { passwordHash, discordId, ...userData } = user._doc

		res.json({
			...userData,
			token,
			message: 'Авторизация прошла успешно'
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось авторизоваться'
		})
	}
}

export const getMe = async (req, res) => {
	try {
		const user = await UserModel.findById(req.userId).populate('refPartner')

		if (!user) {
			return res.status(404).json({
				message: 'Пользователь не найден'
			})
		}

		const { passwordHash, discordId, ...userData } = user._doc

		res.json({
			...userData
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Нет доступа'
		})
	}
}

export const updateMe = async (req, res) => {
	try {
		const password = req.body.password
		const hash = await passwordHashing(password)

		const user = await UserModel.findById(req.userId)
		const isValidPass = await bcrypt.compare(password, user._doc.passwordHash)

		if (isValidPass) {
			return res.status(400).json({
				message: 'Это предыдущий пароль'
			})
		}

		await UserModel.updateOne(
			{
				_id: req.userId
			},
			{
				passwordHash: hash,
				fullName: req.body.fullName,
				avatarUrl: req.body.avatarUrl
			}
		)

		res.json({
			message: 'Данные обновлены'
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось обновить данные'
		})
	}
}
