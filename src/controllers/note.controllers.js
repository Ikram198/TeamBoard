import {ApiError} from "../utils/API-error.js";
import ApiResponse from "../utils/API-response.js";
import {Note }from "../models/note.models.js";
import { asyncHandler } from "../utils/Async-Handler.js";
const create_note = asyncHandler(async (req, res) => { 
    const { Note_content , attachments } = req.body;
    const createdby = req.user.name;

    // const created_by = req.user.name;
    const created_by = "6a759441c7090ec87e66b262";

    const project = req.params.project;
    if(!Note_content){
        return ApiError(401, "please enter a valid note content")
    }
    const note = await Note.insertOne({project:project, createdby:created_by, content: Note_content, attachments:attachments})
    if(!note){
        return ApiError(301, "eroor in creating user in database")
    }
    return res.status(201).json(new ApiResponse(201, "successfully created the project note"))
})

export { create_note };
