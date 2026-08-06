import { asyncHandler } from "../utils/Async-Handler.js";
import { ApiError } from "../utils/API-error.js";
import { Task } from "../models/task.models.js";
import ApiResponse from "../utils/API-response.js";

const create_task = asyncHandler(async(req, res) => {
  const {Task_title, Task_description , assigned_to , status} = req.body;
  if(!Task_description || !Task_description || !assigned_to || !status){
   throw new ApiError(301, "please enter a valid task & description")
  }
  const project = req.user.project ;
  const assigned_by = req.user.name;
  const task = await Task.insertOne({task_title, Task_description,assigned_to, status, project, assigned_by })
  if(!task){
    throw new ApiError(401, "error in creating task in database")
  }
  return ApiResponse(201, "task created successfully")
  
})

export {create_task}                                 
