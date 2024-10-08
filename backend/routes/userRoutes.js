import express from "express";

const router = express.Router();

import {
    authUser
}from '../controllers/user.js';

//import { protect, admin } from '../middleware/authMiddleware.js';

//router.route('/').post(registerUser);
//router.post('/logout', logoutUser);
router.post('/login', authUser);

export default router;