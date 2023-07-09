import swaggerJsdoc from 'swagger-jsdoc'

const PORT = process.env.PORT || 5000
const IP_ADDRES = process.env.IP_ADDRES || 'localhost'

export default swaggerJsdoc({
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'eschool virtualdriving',
			description: 'API eschool-virtualdriving-backend',
			contact: {},
			version: '1.0.0'
		},
		servers: [
			{
				url: `http://${IP_ADDRES}:${PORT}`,
				description: 'Local server'
			}
		]
	},
	apis: ['./routes/*.js']
})
