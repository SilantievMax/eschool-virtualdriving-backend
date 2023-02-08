import PartnerModel from "../models/Partner.js";

export const createPartner = async (req, res) => {
  try {
    const doc = new PartnerModel({
      namePartner: req.body.namePartner,
      description: req.body.description,
    });

    const info = await doc.save();

    res.status(200).json(info);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось добавить данные",
    });
  }
};

export const getAllPartner = async (req, res) => {
  try {
    const info = await PartnerModel.find();

    if (!info) {
      return res.status(404).json({
        message: "Данные нет",
      });
    }

    res.status(200).json(info);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить данные",
    });
  }
};

export const updatePartner = async (req, res) => {
  try {
    const orderId = req.params.id;

    await PartnerModel.updateOne(
      {
        _id: orderId,
      },
      {
        namePartner: req.body.namePartner,
        description: req.body.description,
        status: req.body.status,
      }
    );

    res.json({
      message: "Данные обновлены!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить заказ",
    });
  }
};

export const generatorURLPartner = async (req, res) => {
  try {
    const infoId = req.params.id;

    PartnerModel.findById(
      {
        _id: infoId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не удалось получить партнера",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: `${infoId} такого партнера нет!`,
          });
        }

        const partnerId = doc._id;
        const url = new URL(`?ref=${partnerId}`, process.env.PARTNER_URL);
        res.status(200).json(url);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить данные",
    });
  }
};
