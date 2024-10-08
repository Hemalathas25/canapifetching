import User from "../models/users.js"
import asyncHandler from "../middleware/asyncHandler.js";

/**   
 *  @desc   Register user
 *  @route  POST/api/users
 *  @access public 
 */

const registerUser = asyncHandler(async (req, res) => {
   // const { name, email, password } = req.body;
    res.send('register user');
});


/**   
 *  @desc   Auth user & get token
 *  @route  POST/api/users/login
 *  @access public 
 */

const authUser = asyncHandler(async (req, res) => {
    res.send('auth user');
   // const { email, password } = req.body;
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

