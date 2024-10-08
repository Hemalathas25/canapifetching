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

export { authUser };
