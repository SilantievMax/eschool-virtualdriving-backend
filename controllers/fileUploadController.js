import express from "express";
import fs from "fs";
import { dirname } from "path";
import FileModel from "../models/File.js";

export const uploadfile = async (req, res) => {
    if (req.files) {
        try {
            const file = req.files.file;
            const filePath =
                process.env.SERVER_FILES + file.name.split(" ").join("_");

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
                return res.status(200).json({ fileSave });
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
                const accessLink = `http://192.168.0.14:3002/static/${file.path}`;
                return { file, accessLink };
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
                fs.unlink(`./${file.path}`, (err) => {
                    if (err) {
                        return res
                            .status(500)
                            .json({ message: "Файл не удален" });
                    }
                    return res.status(200).json({ message: "Файл удален" });
                });
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
