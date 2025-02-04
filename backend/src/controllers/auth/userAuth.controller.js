const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const { AsyncHandler } = require("../../utils/handlers/Async.handler");
const ApiError = require("../../utils/handlers/ApiError.handler");

module.exports = {
    login: AsyncHandler(async (req, res) => {
        const { emailAddress, password } = req.body;

        const existingUser = await userModel.findOne({ emailAddress });

        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: "User not found.",
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.passwordHash);

        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Login successful.",
            data: {},
        });

    }),
    signUp: AsyncHandler(async (req, res) => {
        try {
            const { fullName, emailAddress, password, mobileNumber } = req.body;

            // Check if user with the same email or mobile number already exists
            const existingUser = await userModel.findOne({
                $or: [{ emailAddress }, { mobileNumber }],
            });

            if (existingUser) {
                // throw new ApiError(400, "User with the same email or mobile number already exists.")
                return res.status(400).json({
                    success: false,
                    message: "User with the same email or mobile number already exists.",
                });
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // If user does not exist, proceed with signup
            const newUser = new userModel({
                fullName,
                emailAddress,
                passwordHash: hashedPassword, // You should hash the password before saving
                mobileNumber,
            });

            await newUser.save();

            res.status(201).json({
                success: true,
                message: "User registered successfully.",
                data: {},
            });
        } catch (error) {
            console.error("Error during user signup:", error);
            res.status(500).json({
                success: false,
                message: "Internal server error.",
            });
        }

    })
}