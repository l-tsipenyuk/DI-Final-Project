import _ from "lodash";
import { _getAllCards, _addCard, _deleteCard, _editCard, _getOneCard } from "../models/cards.models.js";

export const getAllCards = async (req, res) => {
    try {
        const data = await _getAllCards();
        res.json(data);
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: "No cards found." })
    }
};

export const addCard = async (req, res) => {
    const { image, name, category } = req.body;
    try {
        const data = await _addCard(image, name, category);
        res.json(data);
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: "Can not add card." })
    }
};

export const deleteCard = async (req, res) => {
    const { card_id } = req.params;
    try {
        const data = await _deleteCard(card_id);
        res.json(data);
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: "Can not delete card." })
    }
}

export const getOneCard = async (req, res) => {
    const { card_id } = req.params;
    try {
        const data = await _getOneCard(card_id);
        if (data.length === 0)
            return res.status(404).json({ msg: 'No cards found.' })
        res.json(data);
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: "No cards found." })
    }
}

export const editCard = async (req, res) => {
    const { card_id } = req.params;
    const { image, name } = req.body;
    try {
        const data = await _editCard(card_id, image, name);
        res.json(data);
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: "Can not edit card." })
    }
}

