import TrainingModel from '../models/Training.js'


export const createTraining = async (req, res) => {
    try {
        const doc = new TrainingModel({
            orderNumber: req.body.orderNumber,
            orderName: req.body.orderName,
            communications: req.body.communications,
            orderDate: req.body.orderDate,
            car: req.body.car,
            track: req.body.track,
            experience: req.body.experience,
            files: req.body.files,
            coment: req.body.coment,
            equipment: req.body.equipment,
            executor: req.body.executor,
            price: req.body.price,
            status: req.body.status,
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось создать заказ'
        })
    }
}