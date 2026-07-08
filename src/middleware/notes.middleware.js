import ApiError from "../utils/API-error.js";
import ApiResponse from "../utils/API-response.js";
import { asyncHandler } from "../utils/Async-Handler.js";
const notes_middleware = asyncHandler(async(req, res)=>{
  const {access_token} = req.cookies;
  if (!access_token){
    throw new ApiError(401, "user is not authorised for notes section")
  
})
