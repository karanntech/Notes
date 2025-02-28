import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import { login, register } from "./controllers/authController.js";


const app = express();
const port = process.env.PORT

connectDB()

app.use(express.json());
app.use(cors({credentials: true}));


//API endpoints
app.post("/create-account", register);
app.post("/login", login);

app.listen(port, ()=> console.log(`Server started on PORT:${port}`))