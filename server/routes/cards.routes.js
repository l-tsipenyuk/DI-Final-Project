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

router.delete("/:id",deleteCard);

router.get("/:id",getOneCard);

router.put("/:id",editCard);

module.exports = router;

