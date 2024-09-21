// /routes/userRoutes.js
import express from 'express';
import {createUser, getAllUsers, userSignUpOrSignIn, verifyProof} from '../controllers/UserController.js';

// Initialize router
const router = express.Router();

// POST /users - Create a new user
router.post('/users', createUser);

// GET /users - Get all users
router.get('/users', getAllUsers);
router.post('/signUpOrSignIn', userSignUpOrSignIn);
router.post("/verifyProof", verifyProof);

export default router;