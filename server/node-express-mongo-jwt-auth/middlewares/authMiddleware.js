const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user/userModel');
const JWT_SECRET = 'abc123';

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            //verify token
            const decoded = jwt.verify(token, JWT_SECRET);

            //get user from token
            req.user = await User.findById(decoded.id).select('-password');

            next();

        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, No Token');
    }
})

module.exports = { protect }
