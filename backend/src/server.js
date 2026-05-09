import express from 'express';
import expressSession from 'express-session';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import authRouter from './routes/authRouter.js';
import jobAppRouter from './routes/jobAppsRouter.js';
import authMiddleware from './middleware/authMiddleware.js';
import {rateLimit} from 'express-rate-limit';

// Log immediately on startup
console.error('=== SERVER STARTING ===');
console.error('NODE_ENV:', process.env.NODE_ENV);
console.error('PORT:', process.env.PORT || 3000);

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Only load .env in development (Railway uses environment variables directly)
if (process.env.NODE_ENV !== 'production') {
    console.error('Loading .env file...');
    dotenv.config({ path: path.join(__dirname, '..', '.env') });
}

console.error('Checking required environment variables...');
if (!process.env.EXPRESS_SESSION_SECRET) {
    console.error('❌ ERROR: EXPRESS_SESSION_SECRET is not set!');
    process.exit(1);
}

if (!process.env.NODE_ENV) {
    console.error('❌ ERROR: NODE_ENV is not set!');
    process.exit(1);
}

console.error('✓ Environment variables OK');

// Configure allowed origins for CORS
const frontendOrigin = (process.env.FRONTEND_ORIGIN || '').trim();
const allowedOrigins = [
    'http://localhost:5173',      // Development frontend
    'http://localhost:3000',      // Development backend
];

// Add production frontend if set
if (frontendOrigin) {
    allowedOrigins.push(frontendOrigin);
}

console.error('✓ Server starting with NODE_ENV:', process.env.NODE_ENV);
console.error('✓ FRONTEND_ORIGIN env:', process.env.FRONTEND_ORIGIN);
console.error('✓ Allowed CORS origins:', allowedOrigins);

// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/public')));

// CORS middleware
app.use((req, res, next) => {
    const origin = req.headers.origin;
    
    // For debugging - log ALL requests with their origin
    console.error(`[${new Date().toISOString()}] ${req.method} ${req.path} - Origin: ${origin}`);

    // Check if origin is allowed
    const isAllowed = origin && allowedOrigins.includes(origin);
    
    // TEMPORARILY: Allow all origins for debugging
    if (origin) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
        res.setHeader('Access-Control-Max-Age', '86400');
        
        if (!isAllowed) {
            console.error(`⚠️ TEMPORARY: Allowing non-whitelisted origin: ${origin}`);
        }
    }

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
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
    console.error('✅ Server is running on port ' + (process.env.PORT || 3000));
});