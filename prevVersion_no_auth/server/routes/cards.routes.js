const express = require('express');
const { cards } = require('../config/db.js');

const {
    getAllCards, 
    addCard, 
    deleteCard, 
    getOneCard, 
    editCard
} = require('../controllers/cards.controllers.js');

const router = express.Router();

router.get("/",getAllCards);

router.post("/",addCard);

router.delete("/:card_id",deleteCard);

router.get("/:card_id",getOneCard);

router.put("/:card_id",editCard);

module.exports = router;

