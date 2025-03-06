const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const { AsyncHandler } = require("../../utils/handlers/Async.handler");
const ApiError = require("../../utils/handlers/ApiError.handler");
const ApiResponse = require("../../utils/handlers/ApiResponse.handler");
const { tokenService, welcomeEmailTemplate } = require("../../services");
const { byPassEmail } = require("../../config/config");

module.exports = {
    login: AsyncHandler(async (req, res) => {
        const { emailAddress, password } = req.body;

        const existingUser = await userModel.findOne({ emailAddress });

        if (!existingUser) {
            throw new ApiError(401, "User not found.");
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.passwordHash);

        if (!isPasswordCorrect) {
            throw new ApiError(401, "Invalid credentials.");
        }
        // console.log(existingUser)
        const tokens = await tokenService.generateAuthTokens(existingUser);

        res
            .status(200)
            .json(new ApiResponse(200, { ...tokens }, 'Logged in succesfully.'));

    }),
    signUp: AsyncHandler(async (req, res) => {
        const { fullName, emailAddress, password, mobileNumber } = req.body;

        // Check if user with the same email or mobile number already exists
        const existingUser = await userModel.findOne({
            $or: [{ emailAddress }, { mobileNumber }],
        });

        if (existingUser) {
            throw new ApiError(400, "User with the same email or mobile number already exists.")
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
        // if(byPassEmail === false){
        //     await welcomeEmailTemplate.welcomeEmail(emailAddress, fullName)
        // }

        res
            .status(201)
            .json(
                new ApiResponse(201, {}, 'Signed Up successfully.')
            );

    })
}