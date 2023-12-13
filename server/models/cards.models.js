import { db } from '../config/db.js';

export const _getAllCards = (user_id) => {
    return db("cardsandusers").innerJoin("cards", "cardsandusers.card_id", "cards.card_id")
        .where({ user_id })
}

export const _getOneCard = (card_id) => {
    return db('cards').select('card_id', 'image', 'name').where({ card_id })
    // db("cardsandusers").innerJoin("cards", "cardsandusers.card_id", "cards.card_id")
    // return db("cardsandusers").select("cards", "cardsandusers.card_id", "cards.card_id")
    // .where({ card_id, user_id })
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


