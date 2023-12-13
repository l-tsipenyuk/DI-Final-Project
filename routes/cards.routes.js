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

cards_router.get("/:user_id", getAllCards);

cards_router.post("/",
    async (req, res) => {
        const { image, name, category, user_id } = req.body;
        console.log('user_id->', user_id);
        try {
            const x = await db('cards').insert({ image: image, name: name }, ['card_id', 'image', 'name']);
            const { card_id } = x[0];
            await db("cardsandusers").insert({ user_id, card_id });
            res.json({ name });
        } catch (e) {
            console.log(e);
        }

    });

cards_router.delete("/:card_id",
    async (req, res) => {
        const { card_id } = req.params;
        try {
            await db('cards').where({ card_id }).del().returning(['card_id', 'image', 'name']);
            await db("cardsandusers").where({ card_id }).del();
            res.json({ card_id });
        } catch (e) {
            console.log(e)
        }
    }
);

cards_router.get("/getOneCard/:card_id",
    async (req, res) => {
        console.log("hi")
        const { card_id } = req.params;
        try {
            const data = await db('cards').select('card_id', 'image', 'name').where({ card_id })
            if (data.length === 0)
                return res.status(404).json({ msg: 'No cards found.' })
            res.json(data);
        } catch (e) {
            console.log(e);
            res.status(404).json({ msg: "No cards found." })
        }
    }
);

cards_router.put("/:card_id", editCard);

export default cards_router;

