import { db } from '../config/db.js';

//assuming that we add the cards to the card table and later merge it with users table

export const _getAllCards = (user_id) => {
    // return db('cards').select('card_id', 'image', 'name').orderBy('name');
    return db("cardsandusers").innerJoin("cards", "cardsandusers.card_id", "cards.card_id")
        // .select("cards.card_id", "cards.image", "cards.name", "cards.category")
        .where({ user_id })
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


