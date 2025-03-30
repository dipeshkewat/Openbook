import { Router } from "express";
import { subjectAndSem, getSubject } from "../controllers/subjectAndSem.controller.js";

const router = Router()

router.route('/subjects').post(subjectAndSem)
router.route('/getsubjects').get(getSubject)


export default router