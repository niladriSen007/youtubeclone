import express from "express"
import { verifyToken } from "../verifyToken.js";
import {updateUser,deleteUser,getUser,subscribe,unsubscribe,like,dislike} from "../controllers/user.js"

const router = express.Router();

//update user
router.put("/updateuser/:id",verifyToken,updateUser)

//delete user
router.delete("/deleteuser/:id",verifyToken,deleteUser)

//get user
router.get("/:id",getUser)

//subscribe an user
router.put("/subscribe/:channelId",verifyToken,subscribe)

//unsubscribe an user
router.put("/unsubscribe/:channelId",verifyToken,unsubscribe)

//like a video
router.put("/like/:videoId",verifyToken,like)

//dislike a video
router.put("/dislike/:videoId",verifyToken,dislike)

export default router;