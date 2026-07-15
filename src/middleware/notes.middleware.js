import ApiError from "../utils/API-error.js";
import { asyncHandler } from "../utils/Async-Handler.js";

const notes_middleware = asyncHandler(async(req , res, next) => {
    const {access_token} = req.cookies.access_token;
    const project = req.params.project;
    if (!access_token){
        throw new ApiError(401, "user is not authorised for project access ")
    }
   const decodedPayload = jwt.verify(access_token, process.env.JWT_SECRET);
    const project = req.params.project;
    const Is_member = decodedPayload.projects.find(project);
    if(!Is_member){
        throw new ApiError(401, "user is not a part of this project")
    }
    next();
    
})
