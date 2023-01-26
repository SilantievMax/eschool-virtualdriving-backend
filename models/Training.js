import mongoose from "mongoose";

const TrainingSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    orderName: {
      type: String,
      required: true,
      default: "Тренировка",
    },
    communications: {
      type: String,
      required: true,
      trim: true,
    },
    orderDate: {
      type: Date,
    },
    car: {
      type: String,
      trim: true,
    },
    track: {
      type: String,
      trim: true,
    },
    simulator: {
      type: String,
      trim: true,
    },
    experience: {
      type: String,
      trim: true,
    },
    files: {
      type: String,
    },
    coment: {
      type: String,
      trim: true,
    },
    equipment: {
      type: String,
      trim: true,
    },
    executor: {
      type: String,
    },
    price: {
      type: Number,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["В обработке", "Оплачен", "Ждет оценки", "Заявка закрыта"],
      default: "В обработке",
    },
    mark: {
      type: Boolean,
      required: true,
      default: false,
    },
    views: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Training", TrainingSchema);
