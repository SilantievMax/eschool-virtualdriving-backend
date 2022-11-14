import SetupModel from "../models/Setup.js";
import FileModel from "../models/File.js";

const accessUrl = 'http://localhost:3002/static/'

export const createSetup = async (req, res) => {
    try {
        const order = await SetupModel.find().limit(1).sort({ $natural: -1 });
        const countOrders =
            order.length === 1 ? order[0].orderNumber + 1 : 4000000;

        const doc = new SetupModel({
            orderNumber: countOrders,
            communications: req.body.communications,
            car: req.body.car,
            track: req.body.track,
            simulator: req.body.simulator,
            coment: req.body.coment,
            price: 900,
            user: req.userId,
            setup: req.body.setup,
        });

        const setup = await doc.save();

        res.json(setup);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось создать заказ",
        });
    }
};

export const getAllSetup = async (req, res) => {
    try {
        const orders = await SetupModel.find()
            .populate(["user", "setup"])
            .exec();
        res.json(orders);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить заказ",
        });
    }
};

export const getAllSetupUser = async (req, res) => {
    try {
        const orders = await SetupModel.find({ user: req.userId })
            .populate(["user", "setup"])
            .exec();

        const newFiles = orders.map((file) => {
            const accessLink = `${accessUrl}${file.setup.pathFile}`;
            if (file.status !== "В обработке") {
                return { file, accessLink };
            }
            return { file };
        });

        res.json(newFiles);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить заказы",
        });
    }
};

export const getOneSetup = async (req, res) => {
    try {
        const orderId = req.params.id;

        SetupModel.findOneAndUpdate(
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
                        message: "Не удалось получить заказ",
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: "Заказ не найден",
                    });
                }

                res.json(doc);
            }
        ).populate(["user", "setup"]);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить заказ",
        });
    }
};

export const removeSetup = async (req, res) => {
    try {
        const orderId = req.params.id;

        SetupModel.findOneAndDelete(
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

export const updateSetup = async (req, res) => {
    try {
        const orderId = req.params.id;

        await SetupModel.updateOne(
            {
                _id: orderId,
            },
            {
                communications: req.body.communications,
                car: req.body.car,
                track: req.body.track,
                simulator: req.body.simulator,
                coment: req.body.coment,
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
