const _ = require("lodash");
// const { cards } = require("../config/db.js");
const { _getAllCards, _addCard, _deleteCard, _editCard, _getOneCard, _searchCard } = require("../models/cards.models.js");

const getAllCards = async (req, res) => {
    try {
        const data = await _getAllCards();
        res.json(data);
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: "No cards found." })
    }
}

const addCard = async (req, res) => {
    const { image, name } = req.body;
    try {
        const data = await _addCard(image, name);
        res.json(data);
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: "Can not add card." })
    }
}

const deleteCard = async (req, res) => {
    const {id} = req.params;
    try {
        const data = await _deleteCard(id);
        res.json(data);
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: "Can not delete card." })
    }
}

const getOneCard = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await _getOneCard(id);
        if (data.length === 0)
            return res.status(404).json({ msg: 'No cards found.' })
        res.json(data);
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: "No cards found." })
    }
}

const editCard = async (req, res) => {
    const { id } = req.params;
    const { image, name } = req.body;
    try {
        const data = await _editCard(id, image, name);
        res.json(data);
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: "Can not edit card." })
    }
}

const searchCard = async (req, res) => {
    const { name } = req.query;
    try {
        const rows = await _searchCard(name);
        res.json(rows);
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: "The card is not found." })
    }
}

module.exports = {
    getAllCards, addCard, deleteCard, getOneCard, editCard, searchCard
}