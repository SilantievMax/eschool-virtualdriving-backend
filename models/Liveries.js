import mongoose from "mongoose";

const LiveriesSchema = new mongoose.Schema({
    orderNumber: {
        type: Number,
        required: true,
        unique: true
    },
    orderName: {
        type: String,
        required: true,
        default: 'Ливрея'
    },
    communications: {
        type: String,
        required: true,
        trim: true,
    },
    car: {
        type: String,
        trim: true,
    },
    simulator: {
        type: String,
        trim: true,
    },
    coment: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
        trim: true,
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

export default mongoose.model('Liveries', LiveriesSchema);