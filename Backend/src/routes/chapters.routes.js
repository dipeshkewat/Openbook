import { Router } from "express";
import { chapterList, getChapters } from "../controllers/chapterList.controllers.js";

const router = Router()

router.route('/chapters').post(chapterList)
router.route('/getchapters').get(getChapters)

export default router