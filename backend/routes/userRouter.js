import express from "express";
import { createUser, authenticateUser, findUserProfile } from "../controllers/userController.js";
import verifyToken from "../middleware/verifyToken.js";
const userRouter = express.Router();




userRouter.post("/register", createUser);
userRouter.post("/login", authenticateUser);
userRouter.get("/profile", verifyToken, findUserProfile);


export default userRouter;