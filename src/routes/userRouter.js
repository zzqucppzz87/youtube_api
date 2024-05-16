import { signUp, login, loginFacebook } from '../controllers/userController.js';
import express from 'express';

const userRouter = express.Router();

userRouter.post("/signup", signUp)

userRouter.post("/login", login)

userRouter.post("/login-facebook", loginFacebook)

export default userRouter;