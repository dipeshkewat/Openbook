import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/users.model.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // res.status(200).json({
    //     message: "ok"
    // })

    // get user detail from frontend
    //validation - not empty
    // check if user already exists: username , email
    
    // create user object - create in db
    // remove pass and refresh token from res
    //check fro user creation
    //return res

    const { userName, email, phoneNumber, password, branch } = req.body;


    if ([userName, email, phoneNumber, branch, password].some((field) => !field?.trim())) {
        throw new ApiError(400, "All fields are required");
    }

    const existsUser = await User.findOne({
        $or: [{ userName }, { email }]
    });

    if (existsUser) {
        throw new ApiError(409, "User already exists");
    }

    const user = await User.create({
        userName: userName.toLowerCase(),
        email,
        phoneNumber,
        branch,
        password
    });

    const createUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createUser) {
        throw new ApiError(500, "Something went wrong registering user");
    }

    return res.status(201).json(
        new ApiResponse(200, createUser, "User registered successfully")
    );
});

export { registerUser };

const loginUser = asyncHandler( async (req, res) => {
    // res.status(200).json({
        // message: "ok"
    // })

    // get user detail from frontend
    //validation - not empty
    // check if user already exists: username , email

    const { userName, email, password } = req.body;

    if (!userName && !email) {
        return res.status(400).json({ message: "Username or email is required" });
    }
    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    const query = {
        $or: [{ userName }, { email }]
    };

    const user = await User.findOne(query);

    // const LoginUser = await User.findById(user._id).select("-password -refreshToken -");


    if (!user) {
        return res.status(401).json({ message: "User not found" });
    }
    const isMatch = await user.isPasswordCorrect(password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
    }

    return res.status(200).json(
        new ApiResponse(200, "User login successfully")
    );

} );

export { loginUser };



// Stored this in db
// {
//     "userName": "chiarg",
//     "email": "chiarg@example.com",
//     "phoneNumber": "1234567890",
//     "branch": "CMPN",
//     "password": "password"
// }