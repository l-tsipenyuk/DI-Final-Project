import express from "express";

import {
    getAllCards,
    addCard,
    deleteCard,
    getOneCard,
    editCard
} from "../controllers/cards.controllers.js"

import { verifytoken } from "../middlewares/verifytoken.js";

const cards_router = express.Router();

cards_router.get("/", verifytoken, getAllCards);

cards_router.post("/", verifytoken, addCard);

cards_router.delete("/:id", verifytoken, deleteCard);

cards_router.get("/:id", verifytoken, getOneCard);

cards_router.put("/:id", verifytoken, editCard);

export default cards_router;

