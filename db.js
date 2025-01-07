import mongoose from "mongoose";
import 'dotenv/config'


export const connectDB=async ()=>{
    await mongoose.connect(process.env.MONGODBCONN).then(()=>{
        console.log('Database Connected')
    })

}


