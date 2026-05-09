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

// Use FRONTEND_ORIGIN from env, or default for development
const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
console.log('Server starting with FRONTEND_ORIGIN:', frontendOrigin);

// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/public')));
app.use((req, res, next) => {
    const requestOrigin = req.headers.origin;

    // Log for debugging
    console.log('=== PREFLIGHT DEBUG ===');
    console.log('Method:', req.method);
    console.log('Origin:', requestOrigin);
    console.log('Path:', req.path);

    // For credentialed requests, the origin must be explicitly listed
    // Allow any origin that sends a request (this is permissive for testing)
    if (requestOrigin) {
        res.setHeader('Access-Control-Allow-Origin', requestOrigin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Max-Age', '86400');
    }

    // Always handle OPTIONS (preflight)
    if (req.method === 'OPTIONS') {
        console.log('Responding to OPTIONS preflight');
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
    cookie: {sameSite: "lax", httpOnly: true, secure: process.env.NODE_ENV === "production"}
}));

// main routers
app.use('/auth', authRouter);
app.use('/jobApps', authMiddleware, jobAppRouter);


app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port ' + (process.env.PORT || 3000));
});