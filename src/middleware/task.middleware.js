import {Project} from "../models/project.models.js";
import { asyncHandler } from "../utils/Async-Handler.js";
import { ApiError } from "../utils/API-error.js";
import jwt from "jsonwebtoken";

const task_middleware = asyncHandler(async(req , res, next) => {
    const access_token = req.cookies.access_token;
    const project = req.params.project;
    if (!access_token){
        throw new ApiError(401, "user is not authorised for project access ")
    }
    const decodedPayload = jwt.verify(access_token, process.env.JWT_SECRET);
    req.user = decodedPayload;
    
     const Is_member = decodedPayload.projects.includes(project);
        if(!Is_member){
            throw new ApiError(401, "user is not a part of this project")
        }
    next();

})
export {task_middleware}
