const { db } = require('../config/db.js');

const _getAllCards = () => {
    return db('cards').select('card_id', 'image', 'name').orderBy('name');
}

const _getOneCard = (card_id) => {
    return db('cards').select('card_id', 'image', 'name').where({ card_id });
}

const _addCard = (image, name) => {
    return db('cards').insert({ image: image, name: name }, ['card_id', 'image', 'name']);
}

const _editCard = (card_id, image, name) => {
    return db('cards').update({ image: image, name: name }, ['card_id', 'image', 'name']).where({ card_id });
}

const _deleteCard = (card_id) => {
    return db('cards').where({ card_id }).del().returning(['card_id', 'image', 'name']);
}

module.exports = ({
    _getAllCards, _addCard, _deleteCard, _editCard, _getOneCard
});