import jwt from "jsonwebtoken"


export const shouldBeLoggedIn = async (req, res) => {

    res.status(200).json({ message: "Authenticated" });

}

export const shouldBeAdmin = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ messae: "Not Authorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ messae: "Token is not Valid" });
        }
        if (!decoded.idAdmin) {
            return res.status(403).json({ messae: "Not Admin" });
        }
        res.status(200).json({ message: "Authenticated" });
    })
}