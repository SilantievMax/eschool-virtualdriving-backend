import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    discordId: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: [String],
      required: true,
      enum: ["USER", "SUPERADMIN", "ADMIN", "COACH"],
      default: "USER",
    },
    avatarUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Users", UserSchema);
