import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
const router = express.Router();
import { db } from "./config/db.js";

router.use(bodyParser.json());
router.use(cookieParser());

const users = [];
const secretKey = 'mysecretkey';

router.post('/register2', (req, res) => {
    
    const { username, password } = req.body;
    console.log("Received request:", req.body);

    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
        return res.status(409).json({ message: 'Username already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = { id: users.length + 1, username, password: hashedPassword };
    users.push(newUser);

    const token = jwt.sign({ id: newUser.id, username: newUser.username }, secretKey, {
        expiresIn: '1h',
    });

    res.cookie('token', token, { httpOnly: true });
    res.status(201).json({ message: 'User registered successfully' });
});

router.post('/login2', (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, secretKey, {
        expiresIn: '1h', // Token expires in 1 hour
    });

    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Login successful' });
});

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
});

export default router;