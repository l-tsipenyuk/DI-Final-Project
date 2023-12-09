import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { db } from "./config/db.js";
import cards_router from "./routes/cards.routes.js";
import users_router from "./routes/users.routes.js";

import router from "./auth.js";
import authenticateJWT from "./authMiddleWare.js";

const app = express();
const port = 3002;

app.use(express.json());
app.use(cookieParser());

app.use("/auth", express.json(), router)

app.get('/', (req, res) => {
    res.send('Hello, JWT Authentication!');
});

app.get('/profile', authenticateJWT, (req, res) => {
    res.json({ message: `Welcome, ${req.user.username}!` });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

// dotenv.config();

// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cors());

// app.use("/api/cards", cards_router);
// app.use("/api/users", users_router);

// app.listen(3001, () => {
//     console.log(`running on port 3001`);
// });