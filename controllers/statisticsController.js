import TrainingModel from '../models/Training.js'
import LiveriesModel from '../models/Liveries.js'
import SetupModel from '../models/Setup.js'

const orderCount = async (modelOrder, filter = {}) => {
	const model = modelOrder
	const number = await model.countDocuments(filter)
	return number
}

export const getCountOrders = async (req, res) => {
	try {
		// В обработке, Оплачен, Ждет оценки, Заявка закрыта
		// processing,  paid,    estimation,  ordersClosed

		const countTraining = await orderCount(TrainingModel)
		const countInProcessingTraining = await orderCount(TrainingModel, { status: 'В обработке' })
		const countInPaidTraining = await orderCount(TrainingModel, { status: 'Оплачен' })
		const countInEstimationTraining = await orderCount(TrainingModel, { status: 'Ждет оценки' })
		const countInOrdersClosedTraining = await orderCount(TrainingModel, { status: 'Заявка закрыта' })

		const countLiveries = await orderCount(LiveriesModel)
		const countInProcessingLiveries = await orderCount(LiveriesModel, { status: 'В обработке' })
		const countInPaidLiveries = await orderCount(LiveriesModel, { status: 'Оплачен' })
		const countInEstimationLiveries = await orderCount(LiveriesModel, { status: 'Ждет оценки' })
		const countInOrdersClosedLiveries = await orderCount(LiveriesModel, { status: 'Заявка закрыта' })

		const countSetup = await orderCount(SetupModel)
		const countInProcessingSetup = await orderCount(SetupModel, { status: 'В обработке' })
		const countInPaidSetup = await orderCount(SetupModel, { status: 'Оплачен' })
		const countInEstimationSetup = await orderCount(SetupModel, { status: 'Ждет оценки' })
		const countInOrdersClosedSetup = await orderCount(SetupModel, { status: 'Заявка закрыта' })

		res.status(200).json({
			countTraining,
			countInProcessingTraining,
			countInPaidTraining,
			countInEstimationTraining,
			countInOrdersClosedTraining,
			countLiveries,
			countInProcessingLiveries,
			countInPaidLiveries,
			countInEstimationLiveries,
			countInOrdersClosedLiveries,
			countSetup,
			countInProcessingSetup,
			countInPaidSetup,
			countInEstimationSetup,
			countInOrdersClosedSetup
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось получить данные'
		})
	}
}
