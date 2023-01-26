import liveriesModel from "../models/Liveries.js";

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
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать заказ",
    });
  }
};

export const getAllLiveries = async (req, res) => {
  try {
    const orders = await liveriesModel.find().populate("user").exec();
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
};

export const getOneLiveries = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await liveriesModel.findById(id);
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить статью",
    });
  }
};

export const removeLiveries = async (req, res) => {
  try {
    const id = req.params.id;

    liveriesModel.findOneAndDelete(
      {
        _id: id,
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

export const updateLiveries = async (req, res) => {
  try {
    const id = req.params.id;

    await liveriesModel.updateOne(
      {
        _id: id,
      },
      {
        orderNumber: req.body.orderNumber,
        orderName: req.body.orderName,
        communications: req.body.communications,
        car: req.body.car,
        simulator: req.body.simulator,
        coment: req.body.coment,
        price: req.body.price,
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
