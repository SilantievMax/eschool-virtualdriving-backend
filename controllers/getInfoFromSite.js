import { Error } from 'mongoose'
import FileModel from "../models/File.js";
import CarModel from "../models/Car.js";
import TrackModel from "../models/Track.js";

export const getNamesSetup = async (req, res) => {
  try {
    const docs = await FileModel.find().populate("user").exec();

    if (!docs) {
      return res.status(400).json({ message: "Нет данных!" });
    }

    const newDocs = docs.map((doc) => {
      const { _id, name, imgFile, price } = doc;
      // const accessLinkImg = `${accessUrl}static/${imgFile}`;
      return { _id, name, price, imgFile };
    });

    res.status(200).json(newDocs);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить информацию",
    });
  }
};

export const getSetup = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await FileModel.findById(id).exec();

    const { _id, name, description, imgFile, imgCarFile, price, tracksData } = doc;

    res.status(200).json({ id, name, description, imgFile, imgCarFile, price, tracksData });
  } catch (err) {
    if (err instanceof Error.CastError) {
      res.status(404).json({
        message: "Элемент не найден",
      });

      return;
    }

    res.status(500).json({
      message: "Не удалось получить информацию",
    });
  }
};

export const getAllCar = async (req, res) => {
  try {
    const docs = await CarModel.find();

    if (!docs) {
      return res.status(400).json({ message: "Нет данных!" });
    }

    res.status(200).json(docs);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить данные",
    });
  }
};

export const getAllTrack = async (req, res) => {
  try {
    const docs = await TrackModel.find();

    if (!docs) {
      return res.status(400).json({ message: "Нет данных!" });
    }

    res.status(200).json(docs);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить данные",
    });
  }
};
