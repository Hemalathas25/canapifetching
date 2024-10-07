import User from "../models/users.js"

/**   
 *  @desc   Register user
 *  @route  GET/api/users
 *  @access public 
 */

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

})


/**   
 *  @desc   Auth user & get token
 *  @route  GET/api/users
 *  @access public 
 */

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
});

/**   
 *  @desc   Logout user
 *  @route  GET/api/logout/logout
 *  @access private
 */

const logoutUser = asyncHandler(async (req, res) => {

});

export {
    registerUser,
    authUser,
    logoutUser
}

