import mongoose , {Schema} from "mongoose";
import { TaskStatusEnum } from "../utils/constants.js";
const Taskschema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
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
    project: {
        type: Schema.Types.ObjectId,
        ref: "project",
        required: true
    },
    status: {
        type: String,
        required: true
    }

})

export const Task = mongoose.model("Task", Taskschema)