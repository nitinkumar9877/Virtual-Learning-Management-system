import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB CONNECTED");
    }
    catch (err) {
        console.log(err);
    }
}
export default connectDB;



// import jwt from "jsonwebtoken";

// const genToken = (userId) => {
//     try {
//         const token = jwt.sign(
//             { userId }, 
//             process.env.JWT_SECRET, 
//             { expiresIn: "7d" }
//         );
//         return token; 
//     } catch (error) {
//         console.error("JWT Error:", error);
//         throw new Error("Token generation failed");
//     }
// };

// export default genToken;
