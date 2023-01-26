import mongoose from "mongoose";

const FileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    nameDefault: {
      type: String,
      required: true,
      trim: true,
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
    pathFile: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
    },
    imgFile: {
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
