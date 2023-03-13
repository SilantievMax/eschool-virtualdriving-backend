import dotenv from 'dotenv'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env') })
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
