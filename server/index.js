import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import { route as productRoute } from "./routes/productRoute.js"
import cors from "cors"

const app = express();
app.use(bodyParser.json())
dotenv.config();
app.use(cors({
  origin: 'http://localhost:5173' ,
  credentials: true,
}));

const PORT = 8000
const MONGO_URL = "mongodb://localhost:27017/f2d-combatDB"

mongoose.connect(MONGO_URL).then(() => {
    console.log("DB id successfully connected")
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`)
    })
}).catch((error) => { 
    console.log(error)
})

app.use("/api/products", productRoute)