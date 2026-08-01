import mongoose , {Schema} from "mongoose";
const Taskschema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    Project: {
        type : Schema.Types.ObjectId,
        ref : "project",
        required: true
    },
    assigned_to: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    assigned_by: {
        type : Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    status: {
        type:TaskStatusEnum,
        required: true
    }

})

export const Task = mongoose.model("Task", Taskschema)