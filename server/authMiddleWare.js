import jwt from "jsonwebtoken";

const secretKey = 'mysecretkey';
function authenticateJWT(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token verification failed' });
        }

        req.user = user;
        next();
    });
}

export default authenticateJWT;