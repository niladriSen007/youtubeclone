import express from "express"
import {uploadVideo, deleteVideo, getVideo, updateVideo, trendingVideos, randomVideos, subscriptedVideos, addView, getByTag, search } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";
const router = express.Router();

router.post("/upload",verifyToken,uploadVideo)
router.put("/updateVideo/:id",verifyToken,updateVideo)
router.delete("/deletevideo/:id",verifyToken,deleteVideo)
router.get("/video/:id",verifyToken,getVideo);
router.put("/view/:id", addView)
router.get("/trending", trendingVideos)
router.get("/random", randomVideos)
router.get("/subscribed",verifyToken, subscriptedVideos)
router.get("/tags", getByTag)
router.get("/search", search)

export default router;