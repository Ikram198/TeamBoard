import { asyncHandler } from "../utils/Async-Handler";
import sendmail from "../utils/Send-Mail";

const register = asyncHandler(async (req, res) => {
    const { name, email } = req.body;
    await sendmail(name, email);
    res.status(200).json({ message: "User registered successfully" }); 
    
})

