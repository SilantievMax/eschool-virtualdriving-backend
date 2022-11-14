import express from "express";
import fs from "fs";
import { dirname } from "path";
import FileModel from "../models/File.js";

const accessUrl = "http://localhost:3002/static/";

export const uploadfile = async (req, res) => {
    if (req.files) {
        try {
            const file = req.files.file;
            const img = req.files.img;
            const filePath =
                process.env.SERVER_FILES + file.name.split(" ").join("_");
            const imgPath = img
                ? process.env.SERVER_FILES +
                  "img/" +
                  img.name.split(" ").join("_")
                : "";

            const isFile = await FileModel.findOne({ name: file.name });

            if (!isFile) {
                const doc = new FileModel({
                    name: file.name,
                    type: file.mimetype,
                    size: file.size,
                    pathFile: filePath,
                    user: req.userId,
                    price: req.body.price,
                    imgFile: imgPath,
                });

                const fileSave = await doc.save();

                file.mv(filePath, (err) => {
                    if (err) {
                        return res.status(500).json({
                            message: "Произошла ошибка при загрузке файла",
                        });
                    }
                });
                img.mv(imgPath, (err) => {
                    if (err) {
                        return res.status(500).json({
                            message: "Произошла ошибка при загрузке файла",
                        });
                    }
                });
                return res
                    .status(200)
                    .json({ fileSave, message: "Файла загружен" });
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

export const getAllFile = async (req, res) => {
    try {
        const files = await FileModel.find().populate("user").exec();
        if (files) {
            const newFiles = files.map((file) => {
                const accessLinkFile = `${accessUrl}${file.pathFile}`;
                const accessLinkImg = `${accessUrl}${file.imgFile}`;
                return { file, accessLinkFile, accessLinkImg };
            });
            return res.status(200).json(newFiles);
        }
        res.status(400).json({ message: "Файлов нет" });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить файлы",
        });
    }
};

export const removeFile = async (req, res) => {
    try {
        const fileId = req.params.id;
        const file = await FileModel.findOne({ _id: fileId });

        FileModel.findOneAndDelete(
            {
                _id: fileId,
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res
                        .status(500)
                        .json({ message: "Не удалось удалить заказ" });
                }
                if (!doc) {
                    return res.status(404).json({ message: "Файл не найден" });
                }
                fs.unlink(`./${file.pathFile}`, (err) => {
                    if (err) {
                        return res
                            .status(500)
                            .json({ message: "Файл не удален" });
                    }
                });
                return res.status(200).json({ message: "Файл удален" });
            }
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить файлы",
        });
    }
};

export const pathLocalServerForFiles = express.static(dirname("uploads"));
