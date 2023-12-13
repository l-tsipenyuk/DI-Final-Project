import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import users_router from "./routes/users.routes.js";
import cards_router from "./routes/cards.routes.js";

const app = express();
dotenv.config();

// for rendering
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// ------------------------

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/users", users_router);
app.use("/api/cards", cards_router);

// for rendering
app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
// ------------------------

app.listen(3001, () => {
    console.log(`running on port 3001`);
});

