import {ApiError} from "../utils/API-error.js";
import ApiResponse from "../utils/API-response.js";
import {Note }from "../models/note.models.js";
import { asyncHandler } from "../utils/Async-Handler.js";

const create_note = asyncHandler(async (req, res) => { 
    const { Note_content , attachments } = req.body;
    const createdby = req.user.name;
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


const get_note_by_id = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res
            .status(400)
            .json(new ApiResponse(400, "Note ID is required"));
    }

    const note = await Note.findById(id);

    if (!note) {
        return res.status(404).json(new ApiResponse(404, "Note not found"));
    }

    return res.status(200).json(new ApiResponse(200, "Successfully fetched the note", note));
});



const get_all_notes = asyncHandler(async (req, res) => {
    
})

const delete_note = asyncHandler(async (req, res) => {
    
})

export { create_note , get_note_by_id , get_all_notes , delete_note };
