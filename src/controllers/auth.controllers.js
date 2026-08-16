import { asyncHandler } from "../utils/Async-Handler.js";
import { ApiError } from "../utils/API-error.js";
import ApiResponse from "../utils/API-response.js";
import {User }from "../models/user.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Registeration_sendmail, Forget_password_sendmail} from "../utils/sendmail.js";



const register_user = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password){
    throw new ApiError(401 , "please enter a valid name , email & Password");
    }
    const Existing_User = await User.findOne({email});
    console.log(Existing_User)
    if(Existing_User){
       throw new ApiError(301 , "User is already in use ")
    }
    const Hashed_Password = await bcrypt.hash(password, 12); 
    const Verification_token = await User.Generate_temporary_token();
    if(!Verification_token){
        console.log("Verification token is not generated");
    }
    const time_10_min = Date.now();
    const user = await User.insertOne({User_name: name,isverified: false, email: email , Password: Hashed_Password , Verification_Token:Verification_token , Time_to_verify_token:time_10_min });
    if(!user){
       throw new ApiError(401, "error in creating user in database ")
    }
    console.log("Successfully created new user : ", user)
    await Registeration_sendmail(name, email , Verification_token);
    res.status(200).json({ message: "User registered successfully" });
})


const User_register_verification = asyncHandler(async(req, res)=>{
    const verification_token = req.params.token;
    if(!verification_token){
        throw new ApiError(401 , "please enter a valid verification token");
    }
    const {email, password} = req.body;
    if(!email || !password){
    throw new ApiError(401 , "please enter a valid name , email & Password");
    }
    const user = await User.findOne({ email: email });
    if(!user){
        throw new ApiError(301, "no user found with this email id")
    }
    const compare = await bcrypt.compare(password, user.Password)
    if (!compare){
        throw new ApiError(301, "incorrect password")
    }
    console.log("user verification token : ", user.Verification_Token , verification_token)
    if (user.Verification_Token === verification_token){
        user.isverified = true;
        user.Verification_Token = null;
        user.Time_to_verify_token = null;
        await user.save();
        console.log(user)
    return res.status(201).json(
    new ApiResponse(201, "User verified successfully")
    );
    }
    else{
        throw new ApiError(301, "incorrect token")
    }
})



const login_user = asyncHandler(async (req, res) => {
    const {name, email, password } = req.body;
    if(!name || !email || !password){
       throw new ApiError(401, "incorrect email or password ")
    }
    const user = await User.findOne({email});
    if(!user){
        throw new ApiError(301, "no user found with this email id")
    }
    const compare = await bcrypt.compare(password, user.Password)
    if(compare){

        const full_user = await User.findById(user._id).populate('projects').exec();
        const id = full_user._id.toString();
        const projects = full_user.projects.map(project => project._id.toString());

        if(!projects){
            throw new ApiError(301, "no projects found for this user")
        }
        const payload = {name , email, password, projects , id};
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "18000s" })
        // console.log(token)
        res.cookie('access_token', token, {
        maxAge: 36000000, 
        httpOnly: true,  
        secure: false,    
        sameSite: 'strict'
        });
        
        res.status(200).json({ message: "User logged in successfully" });
    } 
    if(!compare){
    throw new ApiError(401, "incorrect password");
    }
    })



const Forget_Password = asyncHandler(async (req, res) =>{
    const {email} = req.body;
    if(!email){
        throw new ApiError(301, "please enter a valid email address")
    }
    const user = await User.findOne({email});
    if(!user){
        throw new ApiError(301, "No existing user with this email id ")
    }
    const Verification_token = User.Generate_temporary_token();
    if(!Verification_token){
        console.log("Verification token is not generated");
    }
    const time_10_min = Date.now();
    const name = user.User_name;
    await user.updateOne({ Verification_Token: Verification_token , Time_to_verify_token: time_10_min });
    await Forget_password_sendmail(name, email , Verification_token);
    res.status(200).json({ message: "User registered successfully" }); 
})
//i am using same variables Verification_token and time_10_min in forget password and user registration i have to handle this if a error occurs



const Reset_password = asyncHandler(async (req, res) => {
    const Token = req.params.token;
    const {password} = req.body;
    if(!Token || !password){
        throw new ApiError(301, "please enter a valid token and password")
    }
    const user = User.findOne({ Verification_Token: Token });
    if(!user){
        throw new ApiError(301, "No existing user with this token ")
    }
    const hashed_password = await bcrypt.hash(password, 12);
    await user.updateOne({Password: hashed_password , Verification_Token: null , Time_to_verify_token: null });
    res.status(200).json({ message: "Password reset successfully" });
})
    
    

export {register_user, login_user, Forget_Password, Reset_password , User_register_verification };

