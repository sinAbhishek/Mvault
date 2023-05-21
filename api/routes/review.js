import express from "express"

import { Addreview, getreviews } from "../controller/Review.js"


const router=express.Router()
router.post("/",Addreview)
router.get("/:movieid",getreviews)
export default router