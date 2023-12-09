import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import users_router from "./routes/users.routes.js";
import cards_router from "./routes/cards.routes.js";


const app = express();
dotenv.config();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.listen(3001, () => {
    console.log(`running on port 3001`);
});

app.use("/api/users", users_router);
app.use("/api/cards", cards_router);