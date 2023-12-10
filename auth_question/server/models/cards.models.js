import { db } from '../config/db.js';

//assuming that we add the cards to the card table and later merge it with users table

export const _getAllCards = () => {
    return db('cards').select('card_id', 'image', 'name').orderBy('name');
}

export const _getOneCard = (card_id) => {
    return db('cards').select('card_id', 'image', 'name').where({ card_id });
}

export const _addCard = (image, name) => {
    return db('cards').insert({ image: image, name: name }, ['card_id', 'image', 'name']);
}

export const _editCard = (card_id, image, name) => {
    return db('cards').update({ image: image, name: name }, ['card_id', 'image', 'name']).where({ card_id });
}

export const _deleteCard = (card_id) => {
    return db('cards').where({ card_id }).del().returning(['card_id', 'image', 'name']);
}


