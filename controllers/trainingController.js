import TrainingModel from "../models/Training.js";

export const createTraining = async (req, res) => {
    try {
        const order = await TrainingModel.find()
            .limit(1)
            .sort({ $natural: -1 });
        const countOrders =
            order.length === 1 ? order[0].orderNumber + 1 : 1000000;

        const doc = new TrainingModel({
            orderNumber: countOrders,
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
            user: req.userId,
        });

        const training = await doc.save();

        res.json(training);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось создать заказ",
        });
    }
};

export const getAllTraining = async (req, res) => {
    try {
        const orders = await TrainingModel.find().populate("user").exec();
        res.json(orders);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить статьи",
        });
    }
};

export const getAllTrainingUser = async (req, res) => {
    try {
        const orders = await TrainingModel.find({user: req.userId}).populate("user").exec();
        res.json(orders);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить статьи",
        });
    }
};

export const getOneTraining = async (req, res) => {
    try {
        const orderId = req.params.id;

        TrainingModel.findOneAndUpdate(
            {
                _id: orderId,
            },
            {
                views: true,
            },
            {
                returnDocument: "after",
            },

            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: "Не удалось обновить заказ",
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: "Заказ не найден",
                    });
                }

                res.json(doc)
            }
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить статью",
        });
    }
};

export const removeTraining = async (req, res) => {
    try {
        const orderId = req.params.id;

        TrainingModel.findOneAndDelete(
            {
                _id: orderId,
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: "Не удалость удалить заказ",
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: "Заказ не найден",
                    });
                }

                res.json({
                    message: "Заказ удален!",
                });
            }
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить заказы",
        });
    }
};

export const updateTraining = async (req, res) => {
    try {
        const orderId = req.params.id;

        await TrainingModel.updateOne(
            {
                _id: orderId,
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
                mark: req.body.mark,
                views: req.body.views,
            }
        );

        res.json({
            message: "Заказ обновлен",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось обновить заказ",
        });
    }
};
