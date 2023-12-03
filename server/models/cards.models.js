const { db } = require('../config/db.js');

const _getAllCards = () => {
    return db('cards').select('id', 'image', 'name').orderBy('name');
}

const _getOneCard = (id) => {
    return db('cards').select('id', 'image', 'name').where({ id });
}

const _addCard = (image, name) => {
    return db('cards').insert({ image: image, name: name }, ['id', 'image', 'name']);
}

const _editCard = (id, image, name) => {
    return db('cards').update({ image: image, name: name }, ['id', 'image', 'name']).where({ id });
}

const _searchCard = (name) => {
    return db('cards').select('id', 'name', 'price').orderBy('name')
        .whereILike('name', `${name}%`);
}

const _deleteCard = (id) => {
    return db('cards').where({ id }).del().returning(['id', 'image', 'name']);
}

module.exports = ({
    _getAllCards, _addCard, _deleteCard, _editCard, _getOneCard, _searchCard
});