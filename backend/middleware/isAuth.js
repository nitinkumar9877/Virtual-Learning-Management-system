import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    try {
        let { token } = req.cookie;

        if (!token) {
            return res.status(400).json({ message: "user doesn't have a token" });
        }

        let verifyToken = await jwt.verify(token, process.env.JWT_SECRET);

        if (!verifyToken) {
            return res.status(400).json({ message: "user doesn't have a valid token" });
        }

        req.userId = verifyToken.userId;
        next();
    }
    catch (error) {
        return res.status(500).json({ message: `isAuth Error -> ${error.message}` });
    }
}
export default isAuth;