import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
			trim: true
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true
		},
		passwordHash: {
			type: String,
			required: true
		},
		refPartner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Partner'
		},
		role: {
			type: [String],
			required: true,
			enum: ['USER', 'SUPERADMIN', 'ADMIN', 'COACH'],
			default: 'USER'
		},
		avatarUrl: String
	},
	{
		timestamps: true
	}
)

export default mongoose.model('User', UserSchema)
