import TrainingModel from "../models/Training.js";

export const createTraining = async (req, res) => {
  try {
    const order = await TrainingModel.find().limit(1).sort({ $natural: -1 });
    const countOrders = order.length === 1 ? order[0].orderNumber + 1 : 1000000;

    const orders = await TrainingModel.find({ user: req.userId }).sort({ orderNumber: -1 }).populate("user").exec();
    if (orders.length === 3) {
      return res.status(400).json({ message: "Вы уже сделали заказ" });
    }

    const doc = new TrainingModel({
      orderNumber: countOrders,
      communications: req.body.communications,
      orderDate: req.body.orderDate,
      car: req.body.car,
      track: req.body.track,
      simulator: req.body.simulator,
      experience: req.body.experience,
      files: req.body.files,
      coment: req.body.coment,
      equipment: req.body.equipment,
      executor: req.body.executor,
      price: req.body.price,
      user: req.userId,
      privacyPolicy: req.body.privacyPolicy,
      quantityTrining: req.body.quantityTrining,
      promocode: req.body.promocode,
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
    const orders = await TrainingModel.find().sort({ orderNumber: -1 }).populate("user").exec();

    orders.map((order) => {
      order.user.passwordHash = null;
      return order;
    });

    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить заказы",
    });
  }
};

export const getAllTrainingUser = async (req, res) => {
  try {
    const orders = await TrainingModel.find({ user: req.userId }).sort({ orderNumber: -1 }).populate("user").exec();

    orders.map((order) => {
      order.user.passwordHash = null;
      return order;
    });

    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить заказы",
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
            message: "Не удалось получить заказ",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Заказ не найден",
          });
        }

        doc.user.passwordHash = null;

        res.json(doc);
      }
    ).populate("user");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить заказ",
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

        res.status(200).json({
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

    res.status(200).json({
      message: "Заказ обновлен!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить заказ",
    });
  }
};
