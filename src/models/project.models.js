import mongoose , {Schema} from "mongoose";
const Project_schema = new Schema({
    name: {
        type: String,
        required: true
    },
    discription: {
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
    users: [
    {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
]
})

export const Project = mongoose.model("Project", Project_schema)
