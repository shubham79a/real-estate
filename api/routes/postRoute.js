import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { addPost, deletePost, getPost, getPosts, updatePost } from "../controllers/postController.js";

const postRouter = express.Router();


postRouter.get("/", getPosts)
postRouter.get("/:id", getPost)
postRouter.post("/", verifyToken, addPost)
postRouter.put("/:id", verifyToken, updatePost)
postRouter.delete("/:id", verifyToken, deletePost)



export default postRouter;