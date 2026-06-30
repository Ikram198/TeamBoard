import { asyncHandler } from "../utils/Async-Handler.js";
import { ApiError } from "../utils/API-error.js";
import { ApiResponce } from "../utils/API-response.js";
import Project from "../models/project.model.js";


import time from 'time'
const create_project = asyncHandler(async(req, res)=>{
    const {project_title , project_description} = req.body;
    const createdby = req.user.name;
    const createdat = Date.now();

    if (!project_title || !project_description){
        return ApiError(301, "please enter project_title and project_description")
    }
    const project = await Project.insertone({name:project_title, description:project_description, createdby:createdby, createdat:createdat})

    if(!project){
        return ApiError(501, "error in creating new project in database")
    }
    ApiResponce(200, "successfully created new project")

})

export {create_project}