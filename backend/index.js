import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import authRouter from "./route/authRoute.js";

dotenv.config();

// Connect to DB before starting server
connectDB();

const port = process.env.PORT || 5000;
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);

app.get("/demo", (req, res) => {
    res.send("App is started");
});

// Start Server
app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
});
