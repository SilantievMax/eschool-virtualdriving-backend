import SetupModel from '../models/Setup.js'


export const createSetup = async (req, res) => {
    try {
        const doc = new SetupModel({
            orderNumber: req.body.orderNumber,
            orderName: req.body.orderName,
            communications: req.body.communications,
            car: req.body.car,
            track: req.body.track,
            simulator: req.body.simulator,
            coment: req.body.coment,
            price: req.body.price,
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