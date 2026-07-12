import { jwtDecode } from "jwt-decode";


const create_project_middleware = asyncHandler(async(req, res, next)=>{
    const {access_token} = req.cookies;
    if (!access_token){
        throw new ApiError(401, "user is not authorised for creating new project")
    }
    const decodedPayload = jwtDecode(access_token);
    // console.log(decodedPayload);
    const projects = decodedPayload.projects || [];
    return ApiResponse(201, "user is authorised for creating new project and has access to projects: " + projects)

    next();
})

export {create_project_middleware}