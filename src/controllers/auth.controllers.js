import { asyncHandler } from "../utils/Async-Handler.js";
import sendmail from "../utils/sendmail.js";

const register_user = asyncHandler(async (req, res) => {
    const { name, email } = req.body;
    await sendmail(name, email);
    res.status(200).json({ message: "User registered successfully" }); 
    
})

const login_user = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // Implement your login logic here
    res.status(200).json({ message: "User logged in successfully" });
})

export {register_user, login_user};