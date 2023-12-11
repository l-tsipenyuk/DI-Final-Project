import { register, login } from "../models/users.model.js";
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

        const storedHashedPassword = row[0].password;

        const match = bcrypt.compareSync(password, storedHashedPassword);

        if (!match) {
            console.log("Entered Password:", password);
            console.log("Stored Hashed Password:", storedHashedPassword);
            console.log("Password Match Result:", match);

            // const salt = bcrypt.genSaltSync(10);
            // const hash = bcrypt.hashSync(password + "", salt);

            // console.log("Entered Password (before hashing):", password);
            // console.log("Hashed Password:", hash);

            return res.status(404).json({ msg: "The password is invalid." });
        }

        const userId = row[0].id;
        const userEmail = row[0].email;

        const secret = process.env.ACCESS_TOKEN_SECRET;

        const accesstoken = jwt.sign({ userId, userEmail }, secret, {
            expiresIn: "60s",
        });

        res.cookie("token", accesstoken, {
            httpOnly: true,
            maxAge: 60 * 1000,
        });

        res.json({ accesstoken });
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: "Something went wrong..." });
    }
};

export const _register = async (req, res) => {
    const { email, password } = req.body;
    const loweremail = email.toLowerCase();

    const salt = bcrypt.genSaltSync(10);

    console.log("Generated Salt:", salt);
    const hash = bcrypt.hashSync(password + "", salt);

    console.log("Entered Password (before hashing):", password);
    console.log("Hashed Password:", hash);

    try {
        const row = await register(loweremail, hash);
        res.json(row);
    } catch (e) {
        console.log("_register=>", e);
        res.status(404).json({ msg: "Email already exists." })
    }
};






