// routes/user.js
import express from 'express';
import {
    registerUser,
    loginUser
} from '../controllers/user.js';

const router = express.Router();

router.post('/api/users/register', registerUser);
router.get('/api/users/login', loginUser);

export default router;
