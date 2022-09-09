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
    },
    car: {
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

export default mongoose.model('Liveries', LiveriesSchema);