import { asyncHandler } from "../utils/Async-Handler.js";
import { ApiError } from "../utils/API-error.js";
impot time from "time";
import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import sendmail from "../utils/sendmail.js";

const register_user = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password){
    return ApiError(401 , "please enter a valid name , email & Password");
    }
    const Existing_User = User.findone(name , email);
    if(!Existing_User){
        ApiError(301 , "User is already in use ")
    }

    
    const Hashed_Password = bcrypt.hash(plainPassword, 12); 
    const Verification_token = User.Generate_temporary_token();
    if(!Verification_token){
        console.log("Verification token is not generated");
    }
    const time_10_min = time.now();
    
    
    const user = await User.insert_one({name, email , password: Hashed_Password , Verification_token , time_10_min });
    if(!user){
        ApiError(401, "error in creating user in database ")
    }
    console.log("Successfully created new user : ", user)
    await sendmail(name, email , Verification_token);
    res.status(200).json({ message: "User registered successfully" }); 
    
})

const login_user = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // Implement your login logic here
    res.status(200).json({ message: "User logged in successfully" });
})

export {register_user, login_user};
