import express from 'express';
const app=express();
import { userRouter } from './router/userrouter.js';
import { connectDB } from './db.js';
import cors from "cors"

app.use(express.json());
express.urlencoded({extended:true});

app.use(cors());
app.use(cors({origin: 'http://localhost:5173'}));

connectDB();

app.use('/api/user',userRouter);

const port=process.env.PORT;




app.listen(port,()=>{
    console.log('server started at 4000 port')
})

