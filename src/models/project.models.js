import mongoose , {Schema} from "mongoose";
const Project_schema = new Schema({
    project_title: {
        type: String,
        required: true
    },
    project_description: {
        type: String,
        required: true
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    created_at: {
        type: Date,
        required : true
    },
    project_members: [
    {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
        ],
     project_notes: [
    {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
         ],
    tasks: [
    {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
         ]
})

export const Project = mongoose.model("Project", Project_schema)
