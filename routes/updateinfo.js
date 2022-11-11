import { Router } from "express";
import checkAuth from "../utils/checkAuth.js";
import checkRole from "../utils/checkRole.js";
import * as FileController from "../controllers/fileUploadController.js";
import * as CarController from "../controllers/carController.js";
import * as TrackController from "../controllers/trackController.js";

const router = new Router();

router.post("/file", checkRole(["SUPERADMIN"]), checkAuth, FileController.uploadfile);
router.get("/file", checkRole(["SUPERADMIN"]), checkAuth, FileController.getAllFile);
router.delete("/file/:id", checkRole(["SUPERADMIN"]), checkAuth, FileController.removeFile);

router.post("/car", checkRole(["SUPERADMIN"]), checkAuth, CarController.createCar);
router.get("/car", checkRole(["SUPERADMIN"]), checkAuth, CarController.getAllCar);
router.delete("/car/:id", checkRole(["SUPERADMIN"]), checkAuth, CarController.removeCar);

router.post("/track", checkRole(["SUPERADMIN"]), checkAuth, TrackController.createTrack);
router.get("/track", checkRole(["SUPERADMIN"]), checkAuth, TrackController.getAllTrack);
router.delete("/track/:id", checkRole(["SUPERADMIN"]), checkAuth, TrackController.removeTrack);

export default router;
