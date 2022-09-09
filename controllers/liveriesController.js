import liveriesModel from '../models/Liveries.js';

export const createliveries = async (req, res) => {
    try {
        const doc = new liveriesModel({
            orderNumber: req.body.orderNumber,
            orderName: req.body.orderName,
            communications: req.body.communications,
            car: req.body.car,
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

export const getAllLiveries = async (req, res) => {
    try {
        const orders = await liveriesModel.find().populate('user').exec();
        res.json(orders);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}