import { jwtDecode } from "jwt-decode";


const projects_middleware = asyncHandler(async(req, res, next)=>{
    const {access_token} = req.cookies.access_token;
    if (!access_token){
        throw new ApiError(401, "user is not authorised for creating new project")
    }
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedPayload){
        throw new ApiError(401, "user is not authorised for creating new project")
    }
    req.user = decodedPayload;
    // console.log(decodedPayload);
    next();
})

const access_project_middleware = asyncHandler(async(req, res, next) => {
    const {access_token} = req.cookies.access_token;
    if (!access_token){
        throw new ApiError(401, "user is not authorised for creating new project")
    }
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedPayload){
        throw new ApiError(401, "user is not authorised for creating new project")
    }
    const project = req.params.project;
    const Is_member = decodedPayload.projects.find(project);
    if(!Is_member){
        throw new ApiError(401, "user is not a part of this project")
    }
    next();
})

export { projects_middleware , access_project_middleware}
