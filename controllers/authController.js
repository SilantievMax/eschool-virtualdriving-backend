import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';

export const register = async (req, res) => {
    try {
        // Constants
        const JWT_SECRET = process.env.JWT_SECRET;

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            fullName: req.body.fullName,
            email: req.body.email,
            passwordHash: hash,
            role: req.body.role,
            avatarUrl: req.body.avatarUrl,
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                id: user._id,
            },
            JWT_SECRET,
            {expiresIn: '30d'}
        );

        const { passwordHash, ...userData} = user._doc;

        res.json({
            ...userData,
            token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось зарегистрироваться, такой пользователь уже есть'
        });
    }
}

export const login = async (req, res) => {
    try {
        // Constants
        const JWT_SECRET = process.env.JWT_SECRET;

        const user = await UserModel.findOne({email: req.body.email});

        if(!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if(!isValidPass) {
            return res.status(400).json({
                message: 'Неверный пароль или логин'
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            JWT_SECRET,
            {expiresIn: '30d'}
        );

        const { passwordHash, ...userData} = user._doc;

        res.json({
            ...userData,
            token
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось авторизоваться'
        });
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if(!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            });
        }
        
        const { passwordHash, ...userData} = user._doc;

        res.json({
            ...userData
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Нет доступа'
        });
    }
}