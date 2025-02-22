import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ messae: "Not Authorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ messae: "Token is not Valid" });
        }
        req.userId = decoded.id;

        next();
    })
}