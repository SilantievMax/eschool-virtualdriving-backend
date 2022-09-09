import mongoose from "mongoose";

const SetupSchema = new mongoose.Schema({
    orderNumber: {
        type: Number,
        required: true,
        unique: true
    },
    orderName: {
        type: String,
        required: true,
        default: 'Сетап'
    },
    communications: {
        type: String,
        required: true,
    },
    car: {
        type: String,
    },
    track: {
        type: String,
    },
    simulator: {
        type: String,
    },
    coment: {
        type: String,
    },
    price: {
        type: Number
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
},
{
    timestamps: true,
});

export default mongoose.model('Setup', SetupSchema);