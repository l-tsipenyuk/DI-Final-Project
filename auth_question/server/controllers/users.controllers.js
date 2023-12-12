import { register, login, createUserCard, getUserCards, deleteCreatedUserCard } from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const _login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const row = await login(email.toLowerCase());

        if (row.length === 0)
            return res.status(404).json({ msg: "Email is not found." });

        const match = bcrypt.compareSync(password + "", row[0].password);

        if (!match) return res.status(404).json({ msg: "The password is invalid." })

        const userId = row[0].user_id;
        const userEmail = row[0].email;

        const secret = process.env.ACCESS_TOKEN_SECRET;

        const accesstoken = jwt.sign({ userId, userEmail }, secret, {
            expiresIn: "60s",
        });

        res.cookie("token", accesstoken, {
            httpOnly: true,
            maxAge: 60 * 1000,
        });

        res.json({ accesstoken, userId });
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: "Something went wrong ..." });
    }
};

export const _register = async (req, res) => {

    const { email, password } = req.body;

    const loweremail = email.toLowerCase();

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password + "", salt);

    try {
        const row = await register(loweremail, hash);
        res.json(row);
    } catch (e) {
        console.log("_register=>", e);
        res.status(404).json({ msg: "Email already exists." })
    }
};

// functions to manage auth cards

export const _createUserCard = async (req, res) => {
    const { user_id, card_id } = req.body;
    console.log("user_id:", user_id);
    console.log("card_id:", card_id);
    try {
        const data = await createUserCard(user_id, card_id);
        res.json(data);
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: "Can not merge user_id and card_id." })
    }
};

export const _getUserCards = async (req, res) => {
    const { user_id } = req.params;
    try {
        const data = await getUserCards(user_id);
        res.json(data);
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: "Getting auth user cards failed." })
    }
};

export const _deleteCreatedUserCard = async (req, res) => {
    const { card_id, user_id } = req.params;
    try {
        const data = await deleteCreatedUserCard(card_id, user_id);
        res.json(data);
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: "Can not delete card." })
    }
}