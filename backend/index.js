import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import authRouter from "./route/authRoute.js";
import cors from "cors";
import userRoute from "./route/userRoute.js";

dotenv.config();

connectDB();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/auth", authRouter);
app.use("/api/user", userRoute);

app.get("/demo", (req, res) => {
    res.send("App is started");
});

// Start Server
app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
});
