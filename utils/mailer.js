import nodemailer from 'nodemailer'
import dotenf from 'dotenv'

dotenf.config()

const mailer = (toEmail, subjectEmail, orderNumber) => {
	const HOST = process.env.HOST
	const PORT_EMAIL = process.env.PORT_EMAIL
	const EMAIL = process.env.EMAIL
	const PASSWORD_EMAIL = process.env.PASSWORD_EMAIL
	const EMAIL_ADMIN = process.env.EMAIL_ADMIN

	if (toEmail) {
		const transporter = nodemailer.createTransport({
			host: HOST,
			port: PORT_EMAIL,
			auth: {
				user: EMAIL,
				pass: PASSWORD_EMAIL
			}
		})

		const mailOptions = {
			from: EMAIL,
			to: `${toEmail}, ${EMAIL_ADMIN}`,
			subject: '' + subjectEmail,
			text: `"Шаблон письма находится в разработке :)"
      * "Ваш заказ принят, ожидайте, мы напишем сразу как рассмотрим заявку и свяжемся с Вами в соц сетях или по тем данным, что Вы указали в заявке."
      * Номер заявки: ${orderNumber}
      * Наши контакты 
      * https://vk.com/virtualdriving
      * https://discord.gg/tuQxX6F`
		}

		transporter.sendMail(mailOptions, err => {
			if (err) {
				console.log(err)
			}
		})
	}
}

export default mailer
