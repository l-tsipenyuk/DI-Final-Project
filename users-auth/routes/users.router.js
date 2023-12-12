import express from "express";
import { _register, _login } from "../controllers/users.controller.js";
import { verifytoken } from "../middlewares/verifytoken.js";

const u_router = express.Router();

u_router.post("/register", _register);
u_router.post("/login", _login);
u_router.get("/verify", verifytoken, (req, res) => {
  res.sendStatus(201);
});

export default u_router;
