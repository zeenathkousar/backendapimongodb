import express from 'express';

const userRouter=express.Router();

import { addToCart, authmiddleware, loginFunc,signupFunc } from '../controller/userController.js';

userRouter.post('/login',loginFunc);

userRouter.post('/register',signupFunc);

userRouter.post('/add',authmiddleware,addToCart);


export { userRouter}