import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import authRouter from './routes/authRouter.js';
import jobAppRouter from './routes/jobAppsRouter.js';
import authMiddleware from './middleware/authMiddleware.js';
import {rateLimit} from 'express-rate-limit';
import cors from 'cors';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Trust proxy - important for Railway and other services behind load balancers
app.set('trust proxy', 1);

// Only load .env in development (Railway uses environment variables directly)
if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: path.join(__dirname, '..', '.env') });
}


if (!process.env.NODE_ENV) {
    throw new Error('NODE_ENV environment variable is required');
}

// Whitelist for allowed origins
const whitelist = [process.env.FRONTEND_ORIGIN];
if (process.env.CHROME_EXTENSION_ID) {
    whitelist.push(`chrome-extension://${process.env.CHROME_EXTENSION_ID}`);
}

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization'
};

// Use CORS middleware
app.use(cors(corsOptions));

// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/public')));
app.use((req, res, next) => {
    const requestOrigin = req.headers.origin;

    if (requestOrigin) {
        res.setHeader('Access-Control-Allow-Origin', requestOrigin);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
});

app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {success: false, message: 'Too many requests, please try again later.'},
    skip: (req) => req.method === 'OPTIONS'  // Don't rate limit OPTIONS requests
}))

// main routers
app.use('/auth', authRouter);
app.use('/jobApps', authMiddleware, jobAppRouter);


app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port ' + (process.env.PORT || 3000));
});