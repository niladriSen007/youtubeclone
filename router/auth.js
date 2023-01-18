import express from "express"
import { googleAuthentication, signIn, signUp } from "../controllers/auth.js";

const router = express.Router();

//create an user
router.post("/signup",signUp)
//signin user
router.post("/signin",signIn)
//googleLogin User
router.post("/google",googleAuthentication)

export default router;