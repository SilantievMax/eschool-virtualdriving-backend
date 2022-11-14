import mongoose from "mongoose";

const PriceSchema = new mongoose.Schema(
    {
        priceTraining: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Price", PriceSchema);
