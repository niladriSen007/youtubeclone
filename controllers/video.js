import { createError } from "../error.js";
import VideoDetails from "../model/videoDetails.js"
import UserDetails from "../model/userDetails.js"
export const uploadVideo = async(req,res,next)=>{
    
    const newVideo = new VideoDetails({
        ...req.body,
        userId:req.user.id,
    })
    try
    {
            const savedVideo =await newVideo.save();
            res.status(200).json(savedVideo)
    }
    catch(e)
    {
        next(e)
    }
    
}


export const updateVideo = async(req,res,next)=>{

    try
    {
        const video = await VideoDetails.findById(req.params.id);
        if(!video) return next(createError(404,"Video Doesn't Exist"))

        if(req.user.id === video.userId)
       { 
        const updatedVideoId = await VideoDetails.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true});

        res.status(200).json(updatedVideoId)
    }
    else
    {
        return next(createError(403, "You can update only your video!"));
    }
    }
    catch(e)
    {
        next(e)
    }
    
}


export const deleteVideo = async(req,res,next)=>{
    
    try
    {
        const video = await VideoDetails.findById(req.params.id);
        if(!video) return next(createError(404,"Video Doesn't Exist"))

        if(req.user.id === video.userId)
        {
            await VideoDetails.findByIdAndDelete(req.params.id);
            res.status(200).json("Video deleted successfully")
        }
        else
        {
            return next(createError(403, "You can delete only your video!"));
        }
        }
    catch(e)
    {
        next(e)
    }
    
}

export const getVideo = async(req,res,next)=>{
    
    try
    {
        const video = await VideoDetails.findById(req.params.id);
        if(!video) return next(createError(404,"Video Doesn't Exist"))

        res.status(200).send(video)
    }
    catch(e)
    {
        next(e)
    }
    
}


export const addView = async(req,res,next)=>{
    try
    {
        const video = await VideoDetails.findByIdAndUpdate(req.params.id,{$inc:{views : 1}})
        res.status(200).json("The view has been increased.")
        }
    catch(e)
    {
        next(e)
    }
    
}

export const randomVideos = async(req,res,next)=>{
    try
    {
        const videos = await VideoDetails.aggregate([{$sample:{size:40}}])
        res.status(200).json(videos)
    }
    catch(e)
    {
        next(e)
    }
}

export const trendingVideos = async(req,res,next)=>{
    try
    {
        const videos = await VideoDetails.find().sort({views : -1}) //besi view to kom view 
        res.status(200).json(videos)
    }
    catch(e)
    {
        next(e)
    }
}


export const subscriptedVideos = async(req,res,next)=>{
    try
    {
        const user = await UserDetails.findById(req.user.id);
        const subscribedChannels  = user.subscribedUsers;

        const subscribedChannelsList = await Promise.all(
            subscribedChannels.map(channelId=>{
                return VideoDetails.find({userId:channelId})
            })
        )
        res.status(200).json(subscribedChannelsList.flat().sort((a,b)=>b.createdAt - a.createdAt))
    }
    catch(e)
    {
        next(e)
    }
}

export const getByTag =async(req,res,next)=>{
    const tags = await req.query.tags.split(",");
    try
    {
        const videos = await VideoDetails.find({tags:{$in:tags}}).limit(20);
        res.status(200).json(videos)
    }
    catch(e)
    {
        next(e)
    }
}

export const search =async(req,res,next)=>{
    const query = req.query.q;
    try {
      const videos = await VideoDetails.find({
        title: { $regex: query, $options: "i" },
      }).limit(40);
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
}