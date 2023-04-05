import mongoose from 'mongoose'

const SetupSchema = new mongoose.Schema(
	{
		orderNumber: {
			type: Number,
			required: true,
			unique: true
		},
		orderName: {
			type: String,
			required: true,
			default: 'Full pack'
		},
		communications: {
			type: String,
			required: true,
			trim: true
		},
		car: {
			type: String,
			trim: true
		},
		track: {
			type: String,
			trim: true
		},
		simulator: {
			type: String,
			trim: true
		},
		coupon: {
			type: String,
			trim: true,
			default: ''
		},
		coment: {
			type: String,
			trim: true
		},
		price: {
			type: Number,
			trim: true
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		setup: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'File',
			required: true
		},
		payment: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Payment'
		},
		status: {
			type: String,
			required: true,
			enum: ['В обработке', 'Оплачен', 'Ждет оценки', 'Заявка закрыта'],
			default: 'В обработке'
		},
		mark: {
			type: Boolean,
			required: true,
			default: false
		},
		views: {
			type: Boolean,
			required: true,
			default: false
		}
	},
	{
		timestamps: true
	}
)

export default mongoose.model('Setup', SetupSchema)
