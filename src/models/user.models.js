import mongoose , {Schema} from "mongoose";
import secrets;
const userschema = new Schema({
    id: {
        type: String,
        required: true
        // should be unique
    },
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
        required : true
    },
    email: {
        type: String,
        required: true,
        // should be uniques
    },
    isverified: {
        type: Boolean,
    }
    Time_to_verify_token: {
        type: date,
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
userschema.methods.Generate_temporary_token = async function(password){
    token = secrets.token_hex(32);
    return token
}


export const User = mongoose.model("User", userschema)
