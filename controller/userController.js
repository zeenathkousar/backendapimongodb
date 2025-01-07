import express from "express";
import signupModel from "../models/signupmodel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'


const loginFunc= async (req,res)=>{
    const {email,password}=req.body;
    try{
        const exists = await signupModel.findOne({ email });
        if(!exists){
            console.log('user doesnt exits, please register first');
            res.json({success:false,message:"User Doesnt Exists,please register first"});
        }
        else{
            const isMatch= await bcrypt.compare(password,exists.password);
            
            if(!isMatch){
                return  res.json({success:false,message:"Invalid password"})
             }
             else{
                const id=user._id;

            //generating token
            const token=jwt.sign({id},process.env.JWT_SECRET);
            
            console.log(token);

            res.json({success:true,message:"user successfully Loggedin",token})

             }

        }



    }
    catch(e){
        console.log('error');
        res.json({success:false,message:'error in loggin'})
    }


}

const signupFunc=async (req,res)=>{
    const {name,email,password,gender}=req.body
    try{
        //checking if already user exists
        const exists = await signupModel.findOne({ email });
        if(exists){
            res.json({success:false,message:"user already exists,please register with another email"})
        }
        else{
            const var1=await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, var1);

            const newUser = new signupModel({
                name: name,
                email: email,
                password: hashedPassword,
                gender:gender
            });
            const user = await newUser.save();

            const id=user._id;

            //generating token
            const token=jwt.sign({id},process.env.JWT_SECRET);
            
            console.log(token);

            res.json({success:true,message:"user successfully registered",token})

    
        }

    }
    catch(e){
        console.log("error");
        res.json({success:false,message:"Error in registering user"})
    }

}

const authmiddleware=(req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        res.json({success:false,message:"Not Authorized user, Login Again"});
    }
    else{
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        console.log(token_decode);
        req.body.userId=token_decode.id;
        next();


    }


}

const addToCart=(req,res)=>{
    res.send('added to cart')
}

export {loginFunc,signupFunc,addToCart,authmiddleware}