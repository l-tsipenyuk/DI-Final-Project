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

cards_router.delete("/:card_id", verifytoken, deleteCard);

cards_router.get("/:card_id", verifytoken, getOneCard);

cards_router.put("/:card_id", verifytoken, editCard);

// cards_router.get("/", getAllCards);

// cards_router.post("/", addCard);

// cards_router.delete("/:card_id", deleteCard);

// cards_router.get("/:card_id", getOneCard);

// cards_router.put("/:card_id", editCard);

export default cards_router;

