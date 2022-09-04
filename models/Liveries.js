import mongoose from "mongoose";

const LiveriesSchema = new mongoose.Schema({
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