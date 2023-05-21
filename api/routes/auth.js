import express from "express"
import { AddWatchlist, login, Register,Getuser, removeWatchlist } from "../controller/Auth.js"


const router=express.Router()
router.post("/register",Register)
router.post("/login",login)
router.post("/:userid",AddWatchlist)
router.put("/:userid",removeWatchlist)
router.get("/:userid",Getuser)
export default router