import dotenv from 'dotenv'
import './database/database.js'
import express from 'express'
import upload from 'express-fileupload'
import cors from 'cors'
import morgan from 'morgan'
import authRoute from './routes/auth.js'
import ordersRoute from './routes/orders.js'
import updateinfoRoute from './routes/updateInfoSite.js'
import alldataRoute from './routes/getInfoFromSite.js'
import partnerRoute from './routes/partner.js'
import statisticRoute from './routes/statistics.js'
import paymentRoute from './routes/payment.js'
import { pathLocalServerForFiles } from './controllers/uploadFilesController.js'
import process from 'node:process'

dotenv.config()
const app = express()

// Constants
const PORT = process.env.PORT || 5000
const IP_ADDRES = process.env.IP_ADDRES

// Middleware
app.use(cors())
app.use(express.json())
app.use(upload())
if (process.argv[2] == '--development') app.use(morgan('dev'))

// Routes
app.use('/api/auth', authRoute)
app.use('/api/orders', ordersRoute)
app.use('/api/update', updateinfoRoute)
app.use('/api/info', alldataRoute)
app.use('/api/partner', partnerRoute)
app.use('/api/static', pathLocalServerForFiles)
app.use('/api/statistic', statisticRoute)
app.use('/api/pay', paymentRoute)

// Server
app.listen(PORT, IP_ADDRES, err => {
	if (err) {
		return console.log(err)
	}
	console.log(`OK - Server, PORT ${PORT}`)
})
