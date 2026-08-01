import {Project} from "../models/project.models.js";

const task_middleware = asyncHandler(async(req , res, next) => {
    const {access_token} = req.cookies.access_token;
    const project = req.params.project;
    if (!access_token){
        throw new ApiError(401, "user is not authorised for project access ")
    }
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedPayload;
    
    
    next();

})
export {task_middleware}
