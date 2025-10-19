import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getCurrentUser } from "../controller/userController.js";

const userRoute = express.Router();

userRoute.get("/getCurrentUser", isAuth, getCurrentUser);

export default userRoute; 