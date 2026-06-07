import mongoose , {Schema} from "mongoose";
const Project_note_schema = new Schema({
    created_by: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "project",
        required: true
    },
    content: {
        type : String,
        required: true
    }
})

export const Project_note = mongoose.model("Project_note", Project_note_schema)