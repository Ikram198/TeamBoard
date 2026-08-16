import { asyncHandler } from "../utils/Async-Handler.js";
import { ApiError } from "../utils/API-error.js";
import ApiResponse from "../utils/API-response.js";
import {Project} from "../models/project.models.js";
import {User }from "../models/user.models.js";


const all_project = asyncHandler(async(req,res) => {
    // later i will remove projects from cookies and make a db call instead if a problem occurs
    // also this will create problem when will create a new project and will not be able to see it in the list of projects because it will not be in the cookies
    
    const {projects} = req.user
    console.log("user projects : ", projects)
    if(!projects){
        throw new ApiError(401, "user is not a part of any project")
    }
    if(projects.length === 0){
        res.status(201).json(
        new ApiResponse(201, "user is not a part of any project")
    )
    }
    res.status(201).json(
        new ApiResponse(201, "user is a part of " +projects)
    )
})


const create_project = asyncHandler(async(req, res)=>{
    const {project_title , project_description , project_members , project_notes} = req.body;
    const created_by = req.user.name;
    const created_at = Date.now();
    if (!project_title || !project_description || !project_members){
        throw new ApiError(301, "please enter project_title , project_description & project members")
    }
    const project = await Project.insertOne({project_title:project_title, project_description:project_description, created_by:'6a759441c7090ec87e66b262', created_at:created_at , project_members:'6a759441c7090ec87e66b262' , project_notes:'6a759441c7090ec87e66b262' })
    const user = await User.findById('6a759441c7090ec87e66b262');
    user.projects.push(project._id);
    await user.save();
    if(!project){
        throw new ApiError(501, "error in creating new project in database")
    }
    res.status(200).json(
        new ApiResponse(200, "successfully created new project")
    )
})




const project = asyncHandler(async(req, res) => {
    const projectid = req.params.project;
    const the_project = await Project.findById(projectid);
    if (!the_project) {
        throw new ApiError(401, "error in fetching project from database; project may be deleted by someone")
    }
    const {name , discription , created_by , created_at , users , notes , tasks} = the_project;
    
    res.status(200).json(
        new ApiResponse(200, "displaying the project" + the_project)
    )
    
})


export {create_project , all_project , project}
