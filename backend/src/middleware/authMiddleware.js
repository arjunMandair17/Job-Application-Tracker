import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to check if user is authenticated via JWT
function authUser(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"
    
    if (!token) {
        return res.status(401).json({success: false, message: 'Unauthorized - No token provided'});
    }

    try {
        const decoded = jwt.verify(token, process.env.EXPRESS_SESSION_SECRET);
        req.userId = decoded.userId; // Attach userId to request for later use
        next();
    } catch (error) {
        return res.status(401).json({success: false, message: 'Unauthorized - Invalid token'});
    }
}

export default authUser;