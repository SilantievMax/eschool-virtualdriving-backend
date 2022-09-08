import mongoose from "mongoose";

const TrainingSchema = new mongoose.Schema({
    orderNumber: {
        type: Number,
        required: true,
        unique: true
    },
    orderName: {
        type: String,
        required: true,
    },
    communications: {
        type: String,
        required: true,
    },
    orderDate: {
        type: Date
    },
    car: {
        type: String,
    },
    track: {
        type: String,
    },
    experience: {
        type: String,
    },
    files: {
        type: String,
    },
    coment: {
        type: String,
    },
    equipment: {
        type: String,
    },
    executor: {
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
    status: {
        type: String
    }
},
{
    timestamps: true,
});

export default mongoose.model('Training', TrainingSchema);