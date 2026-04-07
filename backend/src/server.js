import express from 'express';
import expressSession from 'express-session';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import authRouter from './routes/authRouter.js';
import jobAppRouter from './routes/jobAppsRouter.js';
import authMiddleware from './middleware/authMiddleware.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

if (!process.env.EXPRESS_SESSION_SECRET) {
    throw new Error('EXPRESS_SESSION_SECRET is required for express-session');
}

const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/public')));
app.use((req, res, next) => {
    const requestOrigin = req.headers.origin;

    if (requestOrigin === frontendOrigin) {
        res.setHeader('Access-Control-Allow-Origin', requestOrigin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
});
app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {sameSite: "lax", httpOnly: true, secure: process.env.NODE_ENV === "production"}
}));

// main routers
app.use('/auth', authRouter);
app.use('/jobApps', authMiddleware, jobAppRouter);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});