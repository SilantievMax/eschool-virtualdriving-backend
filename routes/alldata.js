import { Router } from "express";
import * as GetAllData from '../controllers/getAllDataController.js'


const router = new Router();

router.get('/names-setup', GetAllData.getNamesSetup);

export default router;
