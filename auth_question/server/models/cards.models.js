import { db } from '../config/db.js';

export const _getAllCards = (userId) => {
    return db('cards').select('id', 'category', 'image', 'name').where({user_id: userId}).orderBy('name');
}

export const _getOneCard = (userId, id) => {
    return db('cards').select('id', 'category', 'image', 'name').where({ user_id: userId, id }).first();
}

export const _addCard = (userId, category, image, name) => {
    return db('cards').insert({ user_id: userId, category, image, name }, ['id', 'category', 'image', 'name']);
}

export const _editCard = (userId, id, category, image, name) => {
    return db('cards').update({ category, image, name }, ['id', 'category', 'image', 'name']).where({ user_id: userId, id });
}

export const _deleteCard = (userId, id) => {
    return db('cards').where({ user_id: userId, id }).del().returning(['id', 'category', 'image', 'name']);
}

