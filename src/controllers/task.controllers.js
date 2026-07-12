import { asyncHandler } from "../utils/Async-Handler.js";
import { ApiError } from "../utils/API-error.js";
import { Task } from "../models/task.models.js";
import { ApiResponce } from "../utils/API-response.js";

const create_task = Asynchandler(async(req, res) => {
  const {Task_title, Task_description , assigned_to , status} = req.body;
  if(!Task_description || !Task_description || !assigned_to || !status){
   ApiError(301, "please enter a valid task & description")
  }
  const project = req.user.project ;
  const assigned_by = req.user.name;
  const task = await Task.insertOne({task_title, Task_description,assigned_to, status, project, assigned_by })
  if(!task){
    return ApiError(401, "error in creating task in database")
  }
  ApiResponse(201, "task created successfully")
  
})

export {create_task}                                 
