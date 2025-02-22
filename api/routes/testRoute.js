import express from "express"
import { shouldBeAdmin, shouldBeLoggedIn } from "../controllers/testController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const testRouter = express.Router()

testRouter.get("/should-be-logged-in",verifyToken, shouldBeLoggedIn)
testRouter.get("/should-be-admin", shouldBeAdmin)

export default testRouter;