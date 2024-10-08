import User from "../models/users.js"
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/token.js";

/**   
 *  @desc   Register user
 *  @route  POST/api/users
 *  @access public 
 */

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email});

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('Invalid user data');
    }
});

/**   
 *  @desc   Auth user & get token
 *  @route  POST/api/users/login
 *  @access public 
 */

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email});

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
 *  @desc   Logout user / clear cookie
 *  @route  POST/api/users/logout
 *  @access private
 */

const logoutUser = asyncHandler(async (req, res) => {
        res.send('logout user');
});

export {
    registerUser,
    authUser,
    logoutUser
}

