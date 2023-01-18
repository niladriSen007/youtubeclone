import { createError } from "../error.js"
import UserDetails from "../model/userDetails.js"
import videoDetails from "../model/videoDetails.js";

export const updateUser = async(req,res,next) =>{
    if(req.params.id === req.user.id)
    {
        try
        {
            const updateUser = await UserDetails.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            },{new:true})
            res.status(200).json(updateUser);
        }
        catch(e)
        {
            console.log(e)
        }

    }
    else
    {
        return(next(createError(403, "You can update only your account!")))
    }
}

export const deleteUser = async(req,res,next) =>{
    if(req.params.id === req.user.id)
    {
        try
        {
            const updateUser = await UserDetails.findByIdAndDelete(req.params.id)
            res.status(200).json("User has been deleted");
        }
        catch(e)
        {
            console.log(e)
        }

    }
    else
    {
        return(next(createError(403, "You can Delete only your account!")))
    }
}

export const getUser = async(req,res,next) =>{
    try
    {
        const user = await UserDetails.findById(req.params.id)
        res.status(200).json(user)
    }
    catch(e)
    {
        next(e)
    }
}

export const subscribe = async(req,res,next) =>{
    try
    {
        //amar userId search kore sekhane amar subscribedUsers er array te puchkorlo new channel /user ta
        await UserDetails.findByIdAndUpdate(req.user.id,{
            $push:{subscribedUsers : req.params.channelId},
        })

        //jake ami subscribe korlam tar subscriber count baralo
        await UserDetails.findByIdAndUpdate(req.params.channelId,{
            $inc:{subscribers :  1}
        })
        res.status(200).json("Subscription successfull.")
    }
    catch(e)
    {
        next(e)
    }
}

export const unsubscribe = async(req,res,next) =>{
    try
    {
        //amar userId search kore sekhane amar subscribedUsers er array te puchkorlo new channel /user ta
        await UserDetails.findByIdAndUpdate(req.user.id,{
            $pull:{subscribedUsers : req.params.id},
        })

        //jake ami subscribe korlam tar subscriber count baralo
        await UserDetails.findByIdAndUpdate(req.params.is,{
            $inc:{subscribers :  -1}
        })
        res.status(200).json("Unsubscription successfull.")
    }
    catch(e)
    {
        next(e)
    }
}

export const like = async(req,res,next) =>{
    const userId = req.user.id
    const videoId = req.params.videoId;
    try
    {
        await videoDetails.findByIdAndUpdate(videoId,{
            $addToSet:{likes:userId},
            $pull:{dislikes:userId}
        })
        res.status(200).json("You Liked the video")
    }
    catch(e)
    {
        next(e)
    }
}

export const dislike = async(req,res,next) =>{
    const userId = req.user.id
    const videoId = req.params.videoId;
    try
    {
        await videoDetails.findByIdAndUpdate(videoId,{
            $addToSet:{dislikes:userId},
            $pull:{likes:userId}
        })
        res.status(200).json("You Disliked the video")
    }
    catch(e)
    {
        next(e)
    }
}