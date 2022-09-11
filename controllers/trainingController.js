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

export const getAllTraining = async (req, res) => {
    try {
        const orders = await TrainingModel.find().populate('user').exec();
        res.json(orders);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}

export const getOneTraining = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await TrainingModel.findById(id);
        res.json(order);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить статью'
        })
    }
}

export const removeTraining = async (req, res) => {
    try {
        const id = req.params.id;

        TrainingModel.findOneAndDelete({
            _id: id,
        }, (err, doc) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Не удалость удалить заказ'
                });
            }

            if(!doc) {
                return res.status(404).json({
                    message: 'Заказ не найден'
                })
            }

            res.json({
                message: 'Заказ удален!'
            })
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить заказы'
        })
    }
}

export const updateTraining = async (req, res) => {
    try {
        const id = req.params.id;

        await TrainingModel.updateOne(
            {
                _id: id,
            },
            {
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
            },
        );

        res.json({
            message: 'Заказ обновлен',
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось обновить заказ'
        });
    }
}