import { Request, Response } from "express";
import User from "../model/User.js";
import jwt from "jsonwebtoken";
import TryCatch from "../middlewares/trycatch.js";


//Your Controller -> TryCatch -> New Wrapped Controller
//Handler is your original controller:
export const loginUser = TryCatch(async(req,res)=>{ //this whole function is passing as handler to TryCatch.
    console.log("login controller called with body:", req.body);
    const { email,name,image } = req.body;
    if(!email){
        return res.status(400).json({ message: "Email is required" });
    }
    // Check if the user already exists in the database
    let user = await User.findOne({ email });
    if (!user) {
        // If the user doesn't exist, create a new user
        user = new User({
            name: name,
            email: email,
            image: image,
        });
    }
    
    const token = jwt.sign({ user }, process.env.JWT_SECRET as string, { expiresIn: '2D' }); // making a token with whole user info ( not only the ID) and secret key, expires in 2 days.


    await user.save();
    res.status(200).json({ message: "User logged in successfully", user, token });
})