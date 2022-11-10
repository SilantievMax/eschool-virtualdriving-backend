import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const LINK_DB = process.env.LINK_DB;
const NAME_DB = process.env.NAME_DB;

mongoose
    .connect(LINK_DB + NAME_DB)
    .then(() => console.log("DB OK"))
    .catch((err) => console.log("DB error", err));

export default mongoose;
