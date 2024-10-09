import User from "../models/users.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/token.js";

/**   
 *  @desc   Auth user & get token
 *  @route  POST /api/user/login
 *  @access public 
 */
const authUser = asyncHandler(async (req, res) => {
   console.log(req.body);
   res.send('auth user');
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

/**
 * @desc   logout User / clear cookie
 * @route  POST/api/user/logout
 * @access private
 */

const logoutUser = asyncHandler(async (req, res) => {
    
    res.cookie('jwt', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict',
        expires: new Date(0), 
    });

    res.status(200).json({ message: 'User logged out successfully' });
});


export { 
    authUser,
    registerUser,
    logoutUser
 };
