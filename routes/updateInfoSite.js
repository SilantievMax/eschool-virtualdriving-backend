import { Router } from "express";
import checkAuth from "../utils/checkAuth.js";
import checkRole from "../utils/checkRole.js";
import * as FileController from "../controllers/uploadFilesController.js";
import * as CarController from "../controllers/carController.js";
import * as TrackController from "../controllers/trackController.js";

const router = new Router();

router.post("/file", checkAuth, checkRole(["SUPERADMIN"]), FileController.uploadfile);
router.get("/file", checkAuth, checkRole(["SUPERADMIN"]), FileController.getAllFile);
router.delete("/file/:id", checkAuth, checkRole(["SUPERADMIN"]), FileController.removeFile);

router.post("/car", checkAuth, checkRole(["SUPERADMIN"]), CarController.createCar);
router.get("/car", checkAuth, checkRole(["SUPERADMIN"]), CarController.getAllCar);
router.delete("/car/:id", checkAuth, checkRole(["SUPERADMIN"]), CarController.removeCar);

router.post("/track", checkAuth, checkRole(["SUPERADMIN"]), TrackController.createTrack);
router.get("/track", checkAuth, checkRole(["SUPERADMIN"]), TrackController.getAllTrack);
router.delete("/track/:id", checkAuth, checkRole(["SUPERADMIN"]), TrackController.removeTrack);

export default router;
