import {Project} from "../models/project.model.js";

const task_middleware = asyncHandler(async(req , res, next) => {
    const {access_token} = req.cookies.access_token;
    const project = req.params.project;
    if (!access_token){
        throw new ApiError(401, "user is not authorised for project access ")
    }
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedPayload;
    await const project = Project.findone(project);
    if(! decodedPayload.name == project.created_by){
      throw new ApiError(401, "user is not authorised for creating task ")
    }
  
    
    next();
    
})
export {task_middleware}
