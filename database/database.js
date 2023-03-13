import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()
const LINK_DB = process.env.LINK_DB

mongoose
	.connect(LINK_DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('OK - MongooDB '))
	.catch(err => {
		console.log('DB error:', err.message)
		process.exit(1)
	})

export default mongoose
