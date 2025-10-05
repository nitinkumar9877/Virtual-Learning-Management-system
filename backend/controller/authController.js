import validator from "validator";
import genToken from "../config/token.js";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";

// SIGNUP
export const signup = async (req, res) => {
    try {
        const { Name, Email, Password, Role } = req.body;

        let existUser = await User.findOne({ Email });
        if (existUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        if (!validator.isEmail(Email)) {
            return res.status(400).json({ message: "Enter a valid email" });
        }

        if (Password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        }

        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(Password, salt);

        const user = await User.create({
            Name,
            Email,
            Password: hashPassword,
            Role
        });

        let token = await genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true in production
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        const { Password: pwd, ...userData } = user._doc;
        return res.status(201).json(userData);

    } catch (err) {
        return res.status(500).json({ message: `Signup Error -> ${err.message}` });
    }
};

// LOGIN
export const login = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        let user = await User.findOne({ Email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect Password" });
        }

        let token = await genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true in production
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        const { Password: pwd, ...userData } = user._doc;
        return res.status(200).json(userData);

    } catch (err) {
        return res.status(500).json({ message: `Login Error -> ${err.message}` });
    }
};

// LOGOUT
export const logOut = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logout Successfully" });
    } catch (error) {
        return res.status(500).json({ message: `Logout Error -> ${error.message}` });
    }
};