import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import { HfInference } from "@huggingface/inference";
const app = express();
const port = 3000;
const JWT_SECRET = "";
app.use(cors()); 
app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://shubhmrwt01:Sh%4022676769@cluster0.n8sbd93.mongodb.net/"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB", err ));
app.listen(port,()=>{
    console.log(`Server running on port ${port} `)
})
