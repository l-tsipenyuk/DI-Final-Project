import { db } from "../config/db.js";

export const register = (email, password) => {
    return db("users").insert({ email, password }, ["user_id", "email", "password"]);
};

export const login = (email) => {
    return db("users").select("user_id", "email", "password").where({ email });
};

//merging card_id and user_id to the new table cardsandusers

export const createUserCard = (user_id, card_id) => {
    return db("cardsandusers").insert({ user_id, card_id });
};

export const getUserCards = (user_id) => {
    return db("cardsandusers").innerJoin("cards", "cardsandusers.card_id", "cards.card_id")
        .select("cards.card_id", "cards.image", "cards.name", "cards.category")
        .where({ user_id })
};

export const deleteCreatedUserCard = (user_id, card_id) => {
    return db("cardsandusers").where({ user_id, card_id }).del()
};

