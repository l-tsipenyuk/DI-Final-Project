import express from "express";
import { _register, _login } from "../controllers/users.controllers.js";
import { verifytoken } from "../middlewares/verifytoken.js";

const users_router = express.Router();

users_router.post("/register", _register);
users_router.post("/login", _login);
users_router.get("/verify", verifytoken, (req, res) => {
    res.sendStatus(201);
});

users_router.post("/logout", (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
});

export default users_router;