import express from "express";
import upload from "express-fileupload";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import "./database/database.js";
import authRoute from "./routes/auth.js";
import ordersRoute from "./routes/orders.js";
import fileRoute from "./routes/file.js";

import session from "express-session";
import passport from "passport";
import "./strategies/discordStrategies.js";
import { pathLocalServerForFiles } from "./controllers/fileUploadController.js";
import checkAuth from "./utils/checkAuth.js";

const app = express();
dotenv.config();

// Constants
const PORT = process.env.PORT || 5001;
const IP_ADDRES = process.env.IP_ADDRES;

// Middleware
app.use(cors());
app.use(express.json());
app.use(upload());
app.use(morgan("dev"));

app.use(
    session({
        secret: "xxXX1234",
        cookie: {
            maxAge: 60000 * 60 * 24,
        },
        saveUninitialized: false,
        // resave: false,
        // name: 'discord.oauth2',
        // store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/files", fileRoute);
app.use("/static", pathLocalServerForFiles);

app.listen(PORT, IP_ADDRES, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server OK, PORT ${PORT}`);
});
