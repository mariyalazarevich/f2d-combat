import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import { route as productRoute } from "./routes/productRoute.js"
import { route as orderRoute } from "./routes/orderRoute.js"
import cors from "cors"

const app = express();
app.use(bodyParser.json())
dotenv.config();

const localNetworkOrigin = /^https?:\/\/(localhost|127\.0\.0\.1|192\.168\.\d{1,3}\.\d{1,3}|10\.\d{1,3}\.\d{1,3}\.\d{1,3}|172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3})(:\d+)?$/;

app.use(cors({
  origin(origin, callback) {
    if (!origin || localNetworkOrigin.test(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  credentials: true,
}));

const PORT = 8000
const HOST = "0.0.0.0"
const MONGO_URL = "mongodb://localhost:27017/f2d-combatDB"

mongoose.connect(MONGO_URL).then(() => {
    console.log("DB id successfully connected")
    app.listen(PORT, HOST, () => {
        console.log(`Server is running on http://${HOST}:${PORT}`)
    })
}).catch((error) => { 
    console.log(error)
})

app.use("/api/products", productRoute)
app.use("/api/orders", orderRoute)