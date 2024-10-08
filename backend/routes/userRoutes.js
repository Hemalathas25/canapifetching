import express from "express";

const router = express.Router();

import {
    authUser,
    registerUser,
    logoutUser
}from '../controllers/user.js';

//import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);

export default router;