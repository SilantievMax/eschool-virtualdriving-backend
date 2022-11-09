import mongoose from "mongoose";

const FileSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        accessLink: String,
        size: {
            type: Number,
            default: 0,
        },
        path: {
            type: String,
            default: "",
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("File", FileSchema);