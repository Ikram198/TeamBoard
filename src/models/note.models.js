import mongoose , {Schema} from "mongoose";
const Note_schema = new Schema({
    project:{
        type: Schema.Types.ObjectId,
        ref: "project",
        required: true
    },
    createdby:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    attachements: {
        type : [{
            url: String,
            MimeType: String,
            size : Number
        }]
    }
},
{timestamps:true},
)

export const Note = mongoose.model("Note", Note_schema)