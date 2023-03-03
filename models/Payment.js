import mongoose from 'mongoose'

const PaymentSchema = new mongoose.Schema(
	{
		createdAt: {
			type: String,
			required: true,
			trim: true
		},
		paymentId: {
			type: String,
			required: true,
			trim: true
		},
		description: {
			type: String,
			trim: true
		},
		status: {
			type: String,
			required: true
		},
		amount: {
			type: String,
			required: true,
		},
		paid: {
			type: Boolean,
			required: true,
		}
	},
	{
		timestamps: true
	}
)

export default mongoose.model('Payment', PaymentSchema)
