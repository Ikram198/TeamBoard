import mongoose , {Schema} from "mongoose";
import { awailableUserRoles } from "../utils/constants";
const Project_member_schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref:"user",
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref:"project",
        required:true
    },
    role:{
        type: awailableUserRoles,
        required: true
    }
})

export const Project_member = mongoose.model("Project_member", Project_member_schema)