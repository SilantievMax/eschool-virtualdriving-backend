import mongoose from "mongoose";

const PriseSchema = new mongoose.Schema(
    {
        prise: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Prise", PriseSchema);
