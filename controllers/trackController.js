import TrackModel from "../models/Track.js";

export const createTrack = async (req, res) => {
    try {
        const doc = new TrackModel({
            title: req.body.title,
        });

        const info = await doc.save();

        res.json(info);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось добавить данные",
        });
    }
};

export const getAllTrack = async (req, res) => {
    try {
        const info = await TrackModel.find();
        res.json(info);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить данные",
        });
    }
};

export const removeTrack = async (req, res) => {
    try {
        const infoId = req.params.id;

        TrackModel.findOneAndDelete(
            {
                _id: infoId,
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: "Не удалость удалить информацию",
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: "Данные не найдены",
                    });
                }

                res.json({
                    message: "Данные удалены!",
                });
            }
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить информацию",
        });
    }
};
