import express from "express";
import fs from "fs";
import randomstring from "randomstring";
import { dirname } from "path";
import FileModel from "../models/File.js";

export const uploadfile = async (req, res) => {
  try {
    if (req.files.file) {
      const { file, img, imgCar, tracksData } = req.files;
      const isFile = await FileModel.findOne({ nameDefault: file.name });

      if (isFile) {
        return res.status(200).json({ message: "Файл уже существует!" });
      }

      const name = req.body.name ? req.body.name : file.name.replace(".rar", "");
      const description = req.body.description || ''

      const filePath = `uploads/${randomstring.generate(20)}.rar`;
      // todo: перезаписываются файлы по названию
      const imgPath = img ? `uploads/img/${img.name.split(" ").join("_")}` : `uploads/img/default.png`;
      const imgCarPath = imgCar ? `uploads/img/${imgCar.name.split(" ").join("_")}` : '';

      const staticFilePath = "/static/" + filePath;
      const staticImgPath = "/static/" + imgPath;
      const staticImgCarPath = imgCarPath ? "/static/" + imgCarPath : '';

      const buff = Buffer.from(tracksData.data);
      const { data: tracks } = JSON.parse(buff.toString())

      const doc = new FileModel({
        name,
        nameDefault: file.name,
        description,
        type: file.mimetype,
        size: file.size,
        user: req.userId,
        price: req.body.price,
        pathFile: staticFilePath,
        imgFile: staticImgPath,
        imgCarFile: staticImgCarPath,
        tracksData: tracks,
      });

      const fileSave = await doc.save();

      file.mv(filePath, (err) => {
        if (err) {
          return res.status(500).json({
            message: "Произошла ошибка при загрузке файла",
          });
        }
      });

      if (img) {
        img.mv(imgPath, (err) => {
          if (err) {
            return res.status(500).json({
              message: "Произошла ошибка при загрузке файла",
            });
          }
        });
      }

      if (imgCar) {
        imgCar.mv(imgCarPath, (err) => {
          if (err) {
            return res.status(500).json({
              message: "Произошла ошибка при загрузке файла",
            });
          }
        });
      }

      return res.status(201).json({ fileSave, message: "Файл загружен!" });
    } else {
      res.status(400).json({ message: "Файл не загружен!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Произошла ошибка на сервере" });
  }
};

export const getAllFile = async (req, res) => {
  try {
    const files = await FileModel.find().populate("user").exec();

    if (!files) {
      return res.status(400).json({ message: "Файлов нет!" });
    }

    files.map((file) => {
      file.user.passwordHash = null;
      return file;
    });

    res.status(200).json(files);
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

    if (!file) {
      return res.status(404).json({ message: "Файл не найден!" });
    }

    FileModel.findOneAndDelete(
      {
        _id: fileId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Не удалось удалить заказ" });
        }
        if (!doc) {
          return res.status(404).json({ message: "Файл не найден!" });
        }

        fs.unlink(`./${file.pathFile.replace("/static/", "")}`, (err) => {
          if (err) {
            return res.status(500).json({ message: "Файл не удален" });
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
