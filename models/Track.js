import mongoose from "mongoose";

const TrackSchema = new mongoose.Schema(
    {
        title: {
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

export default mongoose.model("Track", TrackSchema);
