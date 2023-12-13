import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifytoken = (req, res, next) => {
    // const accesstoken = req.cookies.token || req.headers["x-access-token"];

    let accesstoken = req.cookies.token || req.headers['authorization']

    console.log("access token->", accesstoken);

    if (!accesstoken) {
        console.log("No access token");
        return res.status(401).json({ msg: "The user is not authorized" });
    }

    jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log("JWT Verification Error:", err.message);
            return res.status(403).json({ msg: err.message });
        }
        next();
    });
};