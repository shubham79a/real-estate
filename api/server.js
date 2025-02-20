import express from "express"
import cookieParser from "cookie-parser";
import "dotenv/config"
import postRouter from "./routes/postRoute.js";
import authRouter from "./routes/authRoute.js";


const app = express();

app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("API Working");
})


app.use("/api/posts", postRouter)
app.use("/api/auth", authRouter)

app.listen(8800, () => {
    console.log("Server is running!")
})