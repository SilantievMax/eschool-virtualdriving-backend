import { v4 as uuidv4 } from 'uuid'
import { checkout } from '../utils/payment.js'
import PaymentModel from '../models/Payment.js'
import { paymentFactory } from '@a2seven/yoo-checkout'

export const createPaymentDoc = async ({ sum, successUrl, description }) => {
	const idempotenceKey = uuidv4();
	const createPayload = {
		amount: {
			value: sum,
			currency: 'RUB'
		},
		capture: true,
		confirmation: {
			type: 'redirect',
			return_url: successUrl
		},
		description: description,
	}

	const payment = await checkout.createPayment(createPayload, idempotenceKey)

	const doc = new PaymentModel({
		createdAt: payment.created_at,
		description: payment.description,
		paymentId: payment.id,
		paid: payment.paid,
		amount: payment.amount.value,
		status: payment.status
	})

	const result = await doc.save()

	return {
		...result.toObject(),
		redirectUrl: payment.confirmation.confirmation_url
	}
}

export const createPayment = async (req, res) => {
	if (!req.body.sum) {
		res.status(400).json({
			message: 'Не указана сумма для оплаты'
		})
	}

	if (!req.body.description) {
		res.status(400).json({
			message: 'Не указано описание платежа'
		})
	}

	try {
		const payment = await createPaymentDoc({
			sum: req.body.sum,
			description: req.body.description,
			successUrl: req.body.successUrl
		})

		res.status(201).json(payment)
	} catch (error) {
		const response = error.response

		res.status(response.status).json({
			message: `${response.data.code}: ${response.data.description}`
		})
	}
}

export const checkNotification = async (req, res) => {
	try {
		const payment = req.body.object
		const paymentId = payment.id

		await PaymentModel.updateOne(
			{
				paymentId
			},
			{
				status: payment.status,
				paid: payment.paid,
			}
		)

		res.status(200)
	} catch (error) {
		res.status(400)
	}
}