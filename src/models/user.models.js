import mongoose , {Schema} from "mongoose";
import crypto from "crypto";
const userschema = new Schema({
    projects: [
    {
        type: Schema.Types.ObjectId,
        ref: "Project"
    }
],
    notes: [
    {
        type: Schema.Types.ObjectId,
        ref: "Project"
    }
],
    tasks: [
    {
        type: Schema.Types.ObjectId,
        ref: "Project"
    }
],
    // avatar: {
    // we will define it later because it uses image from public folder 
    //     type: 
    // }
    User_name: {
        type : String,
        required : true
    },
    Password: {
        type : String,
        required : true
    },
    Verification_Token: {
        type : String,
    },
    email: {
        type: String,
        required: true,
        // should be uniques
    },
    isverified: {
        type: Boolean,
    },
    Time_to_verify_token: {
        type: Date,
    }
    // may be we have to create verification token
})

userschema.methods.Ispassword_correct = async function(password){
    return await bcrypt.compare(password, this.password)
}
userschema.methods.Generate_access_token = async function(password){
    
}
userschema.methods.Generate_refresh_token = async function(password){
    
}
userschema.statics.Generate_temporary_token = function(password){
    const token = crypto.randomBytes(32).toString("hex");
    return token
}


export const User = mongoose.model("User", userschema)
