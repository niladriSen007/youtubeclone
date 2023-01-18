import mongoose from "mongoose";
import UserDetails from "../model/userDetails.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const userExistOrNot = await UserDetails.find({ email: email });

    if (userExistOrNot.length > 0)
      return res.status(422).json({ message: "User alredy Exists" });
    
    //password hash
    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new UserDetails({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).send("Posted");
  } catch (e) {
    next(e);
  }
};

//sign in
export const signIn = async (req, res, next) => {
  // const {email,password} = req.body;
  try {
    const userExistOrNot = await UserDetails.findOne({ email: req.body.email });

    if (!userExistOrNot) return next(createError(404, "User Not Exist"));

    //password hash
    var isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      userExistOrNot.password
    );

    if (!isPasswordCorrect) return next(createError(400, "Wrong Credentials!"));

    const token = jwt.sign({ id: userExistOrNot._id }, process.env.SECRET_KEY);

    const { password, ...others } = userExistOrNot._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);

    // res.status(200).send(userExistOrNot)
  } catch (e) {
    next(e);
  }
};

//google authertication
export const googleAuthentication = async (req, res, next) => {
  try {
    const user = await UserDetails.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign(
        { id: user._id },
        process.env.SECRET_KEY
      );

      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
        const newUser = new UserDetails({
            ...req.body,
            fromGoogle:true,
        })
        const savedUser = await newUser.save();
        const token = jwt.sign({ id: savedUser._id }, process.env.SECRET_KEY);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (e) {
    next(e);
  }
};
