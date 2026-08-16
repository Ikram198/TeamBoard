import { asyncHandler } from "../utils/Async-Handler.js";
import { ApiError } from "../utils/API-error.js";
import { Task } from "../models/task.models.js";
import ApiResponse from "../utils/API-response.js";

const create_task = asyncHandler(async(req, res) => {
  const {Task_title, Task_description , assigned_to , status} = req.body;
  if(!Task_description || !Task_description || !assigned_to || !status){
   throw new ApiError(301, "please enter a valid task & description")
  }
  const project = req.params.project;
  const assigned_by = req.user.id;
  const task = await Task.insertOne({title: Task_title, description: Task_description, assigned_to: assigned_to, status: status, project: project, assigned_by: assigned_by })
  if(!task){
    throw new ApiError(401, "error in creating task in database")
  }
  res.status(201).json(
    new ApiResponse(201, "task created successfully")
  )
  
})

export {create_task}                                 
