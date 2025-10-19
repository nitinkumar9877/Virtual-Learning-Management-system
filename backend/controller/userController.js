import User from "../model/userModel.js"

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not Found" });
        }

        return res.status(200).json(user);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: `Get Current User Error: ${error.message}`
        });
    }
}
