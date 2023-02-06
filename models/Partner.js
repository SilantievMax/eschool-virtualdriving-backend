import mongoose from "mongoose";

const PartnerSchema = new mongoose.Schema(
  {
    namePartner: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Partner", PartnerSchema);
