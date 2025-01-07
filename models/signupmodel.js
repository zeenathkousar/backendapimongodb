import mongoose from "mongoose";

const signupSchema=mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    gender:{
        type:String
    }
})

let signupModel=mongoose.model('SignupCollection',signupSchema);

export default signupModel;