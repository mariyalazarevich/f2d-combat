import express from "express"
import dotenv from "dotenv"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { route as productRoute } from "./routes/productRoute.js"
import { route as orderRoute } from "./routes/orderRoute.js"
import cors from "cors"

dotenv.config()

const app = express()
app.use(express.json())

const localNetworkOrigin = /^https?:\/\/(localhost|127\.0\.0\.1|192\.168\.\d{1,3}\.\d{1,3}|10\.\d{1,3}\.\d{1,3}\.\d{1,3}|172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3})(:\d+)?$/
const productionOrigins = new Set([
  "https://f2dcombat.by",
  "https://www.f2dcombat.by",
])

app.use(cors({
  origin(origin, callback) {
    if (!origin || productionOrigins.has(origin) || localNetworkOrigin.test(origin)) {
      callback(null, true)
      return
    }
    callback(new Error(`Origin ${origin} is not allowed by CORS`))
  },
  credentials: true,
}))

app.use("/api/products", productRoute)
app.use("/api/orders", orderRoute)

const publicDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "public")
app.use(express.static(publicDir))
app.use((req, res, next) => {
  if (req.method !== "GET" || req.path.startsWith("/api")) {
    next()
    return
  }
  res.sendFile(path.join(publicDir, "index.html"))
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})