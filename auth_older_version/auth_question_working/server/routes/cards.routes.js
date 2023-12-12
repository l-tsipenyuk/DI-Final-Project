import express from "express";

import {
    getAllCards,
    addCard,
    deleteCard,
    getOneCard,
    editCard
} from "../controllers/cards.controllers.js"

import { verifytoken } from "../middlewares/verifytoken.js";

import { db } from "../config/db.js";

const cards_router = express.Router();

cards_router.get("/", getAllCards);

// cards_router.post("/", addCard);
cards_router.post("/",
    async (req, res) => {
        const { image, name, category, user_id } = req.body;
        console.log(`hi, ${name}`);
        try {
            const x = await db('cards').insert({ image: image, name: name }, ['card_id', 'image', 'name']);
            // console.log(x);
            const { card_id } = x[0];
            await db("cardsandusers").insert({ user_id, card_id });
            res.json({ name });
        } catch (e) {
            console.log(e);
        }

    });

cards_router.delete("/:card_id", deleteCard);

cards_router.get("/:card_id", getOneCard);

cards_router.put("/:card_id", editCard);

export default cards_router;

