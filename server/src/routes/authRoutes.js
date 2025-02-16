const express = require('express');

const authRouter = express.Router();

const {signup, login , logout , updateProfile, checkAuth} = require('../controllers/authController');
const proctectRoute = require('../middleware/authMiddleware');

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.put('/update-profile', proctectRoute ,updateProfile);
authRouter.get('/check', proctectRoute , checkAuth);
module.exports = authRouter;


