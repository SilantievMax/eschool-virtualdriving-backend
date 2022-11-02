import { Router } from "express";
import checkAuth from "../utils/checkAuth.js";
import checkRole from "../utils/checkRole.js";
import * as FileController from "../controllers/fileUploadController.js";

const router = new Router();

router.post("/", checkRole(["SUPERADMIN"]), checkAuth, FileController.uploadfile);
router.get("/", checkRole(["SUPERADMIN"]), FileController.getAllFile)
router.delete("/:id", checkRole(["SUPERADMIN"]), FileController.removeFile)

export default router;
