import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import "dotenv/config"
import postRouter from "./routes/postRoute.js";
import authRouter from "./routes/authRoute.js";
import testRouter from "./routes/testRoute.js";
import userRouter from "./routes/userRoute.js";


const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("API Working");
})


app.use("/api/posts", postRouter)
app.use("/api/auth", authRouter)
app.use("api/test", testRouter)
app.use("/api/user",userRouter);

app.listen(8800, () => {
    console.log("Server is running!")
})