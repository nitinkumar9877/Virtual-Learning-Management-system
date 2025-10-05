import jwt from "jsonwebtoken";

const genToken = (userId) => {
    try {
        const token = jwt.sign(
            { userId },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        
        console.log("Generated Token:", token);
        return token;
    } catch (error) {
        console.error("JWT Error:", error);
        throw new Error("Token generation failed");
    }
};

export default genToken;