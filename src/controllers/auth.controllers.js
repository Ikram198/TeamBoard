import { asyncHandler } from "../utils/Async-Handler.js";
import { ApiError } from "../utils/API-error.js";
import ApiResponse from "../utils/API-response.js";
import {User }from "../models/user.models.js";
import bcrypt from "bcrypt";
import { Registeration_sendmail, Forget_password_sendmail} from "../utils/sendmail.js";


const register_user = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password){
    throw new ApiError(401 , "please enter a valid name , email & Password");
    }
    const Existing_User = User.findone(name , email);
    if(Existing_User){
       throw new ApiError(301 , "User is already in use ")
    }
    const Hashed_Password = bcrypt.hash(plainPassword, 12); 
    const Verification_token = User.Generate_temporary_token();
    if(!Verification_token){
        console.log("Verification token is not generated");
    }
    const time_10_min = Date.now();
    
    const user = await User.insert_one({name, email , password: Hashed_Password , Verification_token , time_10_min });
    if(!user){
       throw new ApiError(401, "error in creating user in database ")
    }
    console.log("Successfully created new user : ", user)
    await Registeration_sendmail(name, email , Verification_token);
    res.status(200).json({ message: "User registered successfully" });
})



const User_register_verification = asyncHandler(async(req, res)=>{
    const verification_token = user.params.token;
    const {email, password} = req.body;
    const user = User.findone(email);
    const compare = bcrypt.compare(user.password, password.bcrypt)
    if (!compare){
        throw new ApiError(301, "incorrect password")
    }
    if(!user){
        throw new ApiError(301, "no user found with this email id")
    }
    if (user.verification_token == verification_token){
        ApiResponse(201, "user verified successfully now you can log in ")
    }
})




const login_user = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
       throw new ApiError(401, "incorrect email or password ")
    }
    const user = User.findone(email);
    if(!user){
        throw new ApiError(301, "no user found with this email id")
    }
    const compare = bcrypt.compare(user.password, password.bcrypt)
    if(compare){

        // projects = or access to projects or authorisations
        const payload = {email, password, projects}
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "18000s" })
        
        res.status(200).json({ message: "User logged in successfully" });
    } 
    elese(){
    throw new ApiError(401, "incorrect password");
    }
    })



const Forget_Password = asyncHandler(async (req, res) =>{
    const {email} = req.body;
    if(!email){
        throw new ApiError(301, "please enter a valid email address")
    }
    const user = User.findone(email);
    if(!user){
        throw new ApiError(301, "No existing user with this email id ")
    }
    const Verification_token = User.Generate_temporary_token();
    if(!Verification_token){
        console.log("Verification token is not generated");
    }
    const time_10_min = Date.now();
    await user.insert_one({ Verification_token , time_10_min });
    await Forget_password_sendmail(name, email , Verification_token);
    res.status(200).json({ message: "User registered successfully" }); 
})
//i am using same variables Verification_token and time_10_min in forget password and user registration i have to handle this if a error occurs


const Reset_password =asyncHandler(async (req, res) => {
    const Token = req.params.token;
    const {password} = req.body;
    if(!Token || !password){
        throw new ApiError(301, "please enter a valid token and password")
    }
    const user = User.findone(Token);
    if(!user){
        throw new ApiError(301, "No existing user with this token ")
    }
    const hashed_password = bcrypt.hash(password, 12);
    await user.update_one({password: hashed_password});
    res.status(200).json({ message: "Password reset successfully" });
})
    
    

export {register_user, login_user, Forget_Password, Reset_password , User_register_verification };
