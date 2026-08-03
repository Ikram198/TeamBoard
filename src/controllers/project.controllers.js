import { asyncHandler } from "../utils/Async-Handler.js";
import { ApiError } from "../utils/API-error.js";
import { ApiResponce } from "../utils/API-response.js";
import {Project} from "../models/project.models.js";
import {User }from "../models/user.models.js";


const all_project = asyncHandler(async(req,res) => {
    // later i will remove projects from cookies and make a db call instead if a problem occurs
    const {projects} = req.user
    ApiResponce(201, "user is a part of " +projects)
})


const create_project = asyncHandler(async(req, res)=>{
    const {project_title , project_description} = req.body;
    const createdby = req.user.name;
    const createdat = Date.now();
    if (!project_title || !project_description){
        throw new ApiError(301, "please enter project_title and project_description")
    }
    const project = await Project.insertone({name:project_title, description:project_description, createdby:createdby, createdat:createdat})
    if(!project){
        throw new ApiError(501, "error in creating new project in database")
    }
    ApiResponce(200, "successfully created new project")
})



const project = asyncHandler(async(req, res) => {
    const project = req.params.project;
    const the_project = await Project.findone(project);
    if (!the_project) {
        throw new ApiError(501, "error in fetching project from database project may be deleted by someone")
    }
    const {name , discription , created_by , created_at , users , notes} = the_project;
    
    
    
    ApiResponce(201, "displaying the project" + the_project)
})


export {create_project , all_project , project}
