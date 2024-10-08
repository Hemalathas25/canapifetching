import User from "../models/users.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/token.js";

/**   
 *  @desc   Auth user & get token
 *  @route  POST /api/user/login
 *  @access public 
 */
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

/**   
 *  @desc   Register User
 *  @route  POST /api/user/register
 *  @access public 
 */

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email});

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Create a new user 
    const user = await User.create({
        name,
        email,
        password, // Ensure password is hashed in the User model
    });

    if (user) {
        //Generate and send token
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

export { authUser, registerUser };
