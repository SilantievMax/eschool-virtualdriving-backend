import { Router } from "express";
import checkAuth from "../utils/checkAuth.js";
import * as PartnerController from "../controllers/partnerController.js";

const router = new Router();

router.post("/", PartnerController.createPartner);
router.get("/", PartnerController.getAllPartner);
router.patch("/:id", PartnerController.updatePartner);
router.get("/url/:id", PartnerController.generatorURLPartner);

export default router;
