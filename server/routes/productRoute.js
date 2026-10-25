import express from "express";
import { getAll } from "../controller/productController.js";

export const route = express.Router()
route.get("/products", getAll)