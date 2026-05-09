import express from 'express';
import expressSession from 'express-session';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import authRouter from './routes/authRouter.js';
import jobAppRouter from './routes/jobAppsRouter.js';
import authMiddleware from './middleware/authMiddleware.js';
import {rateLimit} from 'express-rate-limit';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Only load .env in development (Railway uses environment variables directly)
if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: path.join(__dirname, '..', '.env') });
}

if (!process.env.EXPRESS_SESSION_SECRET) {
    throw new Error('EXPRESS_SESSION_SECRET is required for express-session');
}

if (!process.env.NODE_ENV) {
    throw new Error('NODE_ENV environment variable is required');
}

// Configure allowed origins for CORS
const allowedOrigins = [
    'http://localhost:5173',      // Development frontend
    'http://localhost:3000',      // Development backend
    process.env.FRONTEND_ORIGIN,  // Production frontend (from env)
].filter(Boolean); // Remove undefined values

console.log('Server starting with allowed origins:', allowedOrigins);

// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/public')));

// CORS middleware
app.use((req, res, next) => {
    const requestOrigin = req.headers.origin;

    // Log for debugging (remove in production if verbose)
    if (process.env.NODE_ENV !== 'production') {
        console.log('=== CORS DEBUG ===');
        console.log('Method:', req.method);
        console.log('Origin:', requestOrigin);
        console.log('Path:', req.path);
    }

    // Check if origin is allowed
    if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
        res.setHeader('Access-Control-Allow-Origin', requestOrigin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
        res.setHeader('Access-Control-Max-Age', '86400');
    }

    // Always handle OPTIONS (preflight) requests
    if (req.method === 'OPTIONS') {
        if (process.env.NODE_ENV !== 'production') {
            console.log('Responding to OPTIONS preflight');
        }
        return res.sendStatus(204);
    }

    next();
});

app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {success: false, message: 'Too many requests, please try again later.'}
}))

app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",  // HTTPS required in production
        maxAge: 24 * 60 * 60 * 1000  // 24 hours
    }
}));

// main routers
app.use('/auth', authRouter);
app.use('/jobApps', authMiddleware, jobAppRouter);


app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port ' + (process.env.PORT || 3000));
});