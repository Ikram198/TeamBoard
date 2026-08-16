import { jwtDecode } from "jwt-decode";
import { asyncHandler } from "../utils/Async-Handler.js";
import { ApiError } from "../utils/API-error.js";
import ApiResponse from "../utils/API-response.js";
import jwt from "jsonwebtoken";


const projects_middleware = asyncHandler(async(req, res, next)=>{
    const access_token = req.cookies.access_token;
    if (!access_token){
        throw new ApiError(401, "user is not authorised for creating project")
    }
    const decodedPayload = jwt.verify(access_token, process.env.JWT_SECRET);
    if (!decodedPayload){
        throw new ApiError(401, "user is not authorised for creating new project")
    }
    req.user = decodedPayload;
    next();
})

const access_project_middleware = asyncHandler(async(req, res, next) => {
    const access_token = req.cookies.access_token;
    if (!access_token){
        throw new ApiError(401, "user is not authorised for creating new project")
    }
    const decodedPayload = jwt.verify(access_token, process.env.JWT_SECRET);
    if (!decodedPayload){
        throw new ApiError(401, "user is not authorised for creating new project")
    }
    const project = req.params.project;
    console.log("decoded payload : ", decodedPayload , project)
    const Is_member = decodedPayload.projects.includes(project);

    if(!Is_member){
        throw new ApiError(401, "user is not a part of this project")
    }
    next();
})

export { projects_middleware , access_project_middleware}
