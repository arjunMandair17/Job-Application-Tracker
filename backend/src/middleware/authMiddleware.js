import express from 'express';

const router = express.Router();

// Middleware to check if user is authenticated

function authUser(req, res, next) {
    if(!req.session || !req.session.userId) {
        return res.status(401).json({message: 'Unauthorized'});
    }
    next();
}

export default authUser;