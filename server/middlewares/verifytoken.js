import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifytoken = async (req, res, next) => {
    console.log(req.cookies.accesstoken)

    let token = req.body.token; 
    console.log(req.cookies.token);
    if (!token) return res.status(401).json({ msg: 'No token' })

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ msg: 'Not authorized' })

        next();
    })
};

