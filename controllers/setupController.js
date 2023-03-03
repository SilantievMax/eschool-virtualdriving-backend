import SetupModel from '../models/Setup.js'
import FileModel from '../models/File.js'
import UserModel from '../models/User.js'
import mailer from '../utils/mailer.js'
import * as Payment from './paymentController.js'

export const createSetup = async (req, res) => {
	try {
		const setupId = req.params.idsetup

		const order = await SetupModel.find().limit(1).sort({ $natural: -1 })
		const countOrders = order.length === 1 ? order[0].orderNumber + 1 : 4000000

		const user = await UserModel.findById(req.userId)
		mailer(user.email, 'Сетап', countOrders)

		const fileDoc = await FileModel.findById(setupId).exec()

		const doc = new SetupModel({
			orderNumber: countOrders,
			communications: req.body.communications,
			car: fileDoc.name,
			track: req.body.track,
			simulator: req.body.simulator,
			coupon: req.body.coupon,
			coment: req.body.coment,
			price: fileDoc.price,
			user: req.userId,
			setup: setupId,
			payment: null
		})

		const setupDoc = await doc.save()
		const setup = setupDoc.toObject()

		res.json(setup)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось создать заказ'
		})
	}
}

export const getAllSetup = async (req, res) => {
	try {
		// const orders = await SetupModel.find().sort({ orderNumber: -1 }).populate(["user", "setup"]).exec();
		const orders = await SetupModel.find()
			.sort({ orderNumber: -1 })
			.populate({ path: 'user', populate: { path: 'refPartner' } })
			.exec()

		orders.map(order => {
			order.user.passwordHash = null
			return order
		})

		res.json(orders)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось получить заказы'
		})
	}
}

export const getAllSetupUser = async (req, res) => {
	try {
		const orders = await SetupModel.find({ user: req.userId }).sort({ orderNumber: -1 }).populate(['user', 'setup']).exec()

		const newOrders = orders.map(order => {
			if (order.status === 'В обработке') {
				order.setup.pathFile = ''
			}
			order.user.passwordHash = ''
			return order
		})

		res.status(200).json(newOrders)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось получить заказы'
		})
	}
}

export const getOneSetup = async (req, res) => {
	try {
		const orderId = req.params.id

		SetupModel.findOneAndUpdate(
			{
				_id: orderId
			},
			{
				views: true
			},
			{
				returnDocument: 'after'
			},

			(err, doc) => {
				if (err) {
					console.log(err)
					return res.status(500).json({
						message: 'Не удалось получить заказ'
					})
				}

				if (!doc) {
					return res.status(404).json({
						message: 'Заказ не найден'
					})
				}

				doc.user.passwordHash = null

				res.json(doc)
			}
		).populate(['user', 'setup'])
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось получить заказ'
		})
	}
}

export const removeSetup = async (req, res) => {
	try {
		const orderId = req.params.id

		SetupModel.findOneAndDelete(
			{
				_id: orderId
			},
			(err, doc) => {
				if (err) {
					console.log(err)
					return res.status(500).json({
						message: 'Не удалость удалить заказ'
					})
				}

				if (!doc) {
					return res.status(404).json({
						message: 'Заказ не найден'
					})
				}

				res.json({
					message: 'Заказ удален!'
				})
			}
		)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось получить заказы'
		})
	}
}

export const updateSetup = async (req, res) => {
	try {
		const orderId = req.params.id

		await SetupModel.updateOne(
			{
				_id: orderId
			},
			{
				communications: req.body.communications,
				car: req.body.car,
				track: req.body.track,
				simulator: req.body.simulator,
				coment: req.body.coment,
				price: req.body.price,
				status: req.body.status,
				mark: req.body.mark,
				views: req.body.views
			}
		)

		res.json({
			message: 'Заказ обновлен!'
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось обновить заказ'
		})
	}
}

export const paymentSetup = async (req, res) => {
	try {
		const orderId = req.params.idsetup
		const order = await SetupModel.findOne({ orderNumber: orderId }).exec()

		// create payment
		const payment = await Payment.createPaymentDoc({
			sum: order.price,
			description: `Заказ #${orderId}: ${order.car}`,
			successUrl: req.body.successUrl
		})

		// update setup payment field
		await SetupModel.updateOne(
			{
				orderNumber: orderId
			},
			{
				payment: payment._id
			}
		)

		res.json({
			redirectUrl: payment.redirectUrl
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Не удалось создать оплату'
		})
	}
}