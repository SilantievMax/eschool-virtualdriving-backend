import jwt from 'jsonwebtoken'

export default function (roles) {
	return function (req, res, next) {
		const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
		const JWT_SECRET = process.env.JWT_SECRET

		if (token) {
			try {
				const decoded = jwt.verify(token, JWT_SECRET)
				const role = decoded.role[0]

				let hasRole = false
				if (roles.includes(role)) {
					hasRole = true
				}

				if (!hasRole) {
					return res.status(403).json({
						message: 'Нет доступа!'
					})
				}

				next()
			} catch (e) {
				return res.status(403).json({
					message: 'Нет доступа!'
				})
			}
		} else {
			return res.status(403).json({
				message: 'Нет доступа!'
			})
		}
	}
}
