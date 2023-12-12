import express from "express";
import { _getallproducts } from "../controllers/products.controller.js";

import { verifytoken } from "../middlewares/verifytoken.js";

const p_router = express.Router();

p_router.get("/all", verifytoken, _getallproducts);

export default p_router;
