import express from "express";
import { sendOrder } from "../controller/orderController.js";

export const route = express.Router()
route.post("/order", sendOrder)