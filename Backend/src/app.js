import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()


app.use(cors({
    origin: process.env.CORS_ORIG,
    credentials: true
}))

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(express.static("public"))

app.use(cookieParser())

//routes

import userRouter  from "./routes/user.routes.js";

app.use('/api/v1/users' , userRouter);

// http://localhost:8000/api/v1/users/register

app.use('/api/v1/users', userRouter);
// http://localhost:8000/api/v1/users/login

import subjectRouter from "./routes/Subject.routes.js";

app.use('/api/v1/subjects', subjectRouter);

// http://localhost:8000/api/v1/subjects/subjects

import chapterRouter from "./routes/chapters.routes.js";

app.use('/api/v1/chapters', chapterRouter);

// http://localhost:8000/api/v1/chapters/chapters



export{ app }