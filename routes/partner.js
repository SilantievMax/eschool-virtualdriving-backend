import { Router } from 'express'
import checkAuth from '../utils/checkAuth.js'
import * as PartnerController from '../controllers/partnerController.js'

const router = new Router()

router.post('/', checkAuth, PartnerController.createPartner)
router.get('/', checkAuth, PartnerController.getAllPartner)
router.get('/:id', checkAuth, PartnerController.getOnePartner)
router.patch('/:id', checkAuth, PartnerController.updatePartner)
router.get('/url/:id', checkAuth, PartnerController.generatorURLPartner)

export default router
