import FileModel from "../models/File.js";
import CarModel from "../models/Car.js";
import TrackModel from "../models/Track.js";

const accessUrl = 'http://localhost:3002/static/'

export const getNamesSetup = async (req, res) => {
    try {
        const orders = await FileModel.find().populate("user").exec();
        if (!orders) {
            return res.status(400).json({ message: "Нет данных" });
        }
        const newOrders = orders.map((order) => {
            const { _id, name, imgFile, price } = order;
            const accessLinkImg = `${accessUrl}${imgFile}`;
            return { _id, name, price, accessLinkImg };
        });
        res.json(newOrders);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить информацию",
        });
    }
};

export const getAllCar = async (req, res) => {
    try {
        const info = await CarModel.find();
        res.json(info);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить данные",
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