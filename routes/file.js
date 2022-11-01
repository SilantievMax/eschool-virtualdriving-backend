import { Router } from "express";
import checkAuth from "../utils/checkAuth.js";
import checkRole from "../utils/checkRole.js";
import * as FileController from "../controllers/fileUploadController.js";

const router = new Router();

router.post("/", checkAuth, FileController.uploadfile);

export default router;
