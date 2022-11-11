import FileModel from "../models/File.js";

const accessUrl = 'http://localhost:3002/static/'

export const getNamesSetup = async (req, res) => {
    try {
        const orders = await FileModel.find().populate("user").exec();
        if (!orders) {
            return res.status(400).json({ message: "Нет данных" });
        }
        const newOrders = orders.map((order) => {
            const { _id, name, imgFile, prise } = order;
            const accessLinkImg = `${accessUrl}${imgFile}`;
            return { _id, name, prise, accessLinkImg };
        });
        res.json(newOrders);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить информацию",
        });
    }
};
