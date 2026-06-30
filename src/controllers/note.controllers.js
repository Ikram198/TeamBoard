import ApiError from "../utils/API-error.js";
import ApiResponse from "../utils/API-response.js";
import { asyncHandler } from "../utils/Async-Handler.js";
const create_note = asyncHandler(async (req, res) => { 
    const { Note_content , attachments } = req.body;
    const createdby = req.user.name;
    const project = req.user.project;
    if(!Note_content){
        return ApiError(401, "please enter a valid note content")
    }
    const note = await Note.insert_one({project, createdby:createdby, content: Note_content, attachments })
    if(!note){
        return ApiError(301, "eroor in creating user in database")
    }
    ApiResponse(201, "successfully created the project note")
})

export { create_note };