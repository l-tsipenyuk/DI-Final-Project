import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifytoken = async (req, res, next) => {
    const accesstoken = req.cookies.token || req.headers["x-access-token"];

    if (!accesstoken) return res.status(401).json({ msg: "unauthorized" });

    try {
        const decoded = jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRET);
        next();
    } catch (err) {
        res.status(403).json({ msg: err.message });
    }

};