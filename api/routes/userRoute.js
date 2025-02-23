import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const userRouter = express.Router();

userRouter.get("/users", getUsers)
userRouter.get("/:id", verifyToken, getUser)
userRouter.put("/:id", verifyToken, updateUser)
userRouter.delete("/:id", verifyToken, deleteUser)


export default userRouter;