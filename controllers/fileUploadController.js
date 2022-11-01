import express from "express";
import { dirname } from "path";
import FileModel from "../models/File.js";

export const uploadfile = async (req, res) => {
    if (req.files) {
        try {
            const file = req.files.file;
            const filePath = process.env.SERVER_FILES + file.name;

            const isFile = await FileModel.findOne({ name: file.name });

            if (!isFile) {
                const doc = new FileModel({
                    name: file.name,
                    type: file.mimetype,
                    size: file.size,
                    path: filePath,
                    user: req.userId,
                });

                const fileSave = await doc.save();

                file.mv(filePath, (err) => {
                    if (err) {
                        return res.status(500).json({
                            message: "Произошла ошибка при загрузке файла",
                        });
                    }
                });
                return res.status(200).json(fileSave);
            }

            return res.status(200).json({ message: "Файл уже существует" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Произошла ошибка на сервере" });
        }
    } else {
        res.status(400).json({ message: "Файл не найден" });
    }
};

export const pathLocalServerForFiles = express.static(dirname("uploads"));
