import express from 'express';
import expressSession from 'express-session';
import {dirname, pathname} from 'path';

const app = express();



__filename = pathname(import.meta.url);
__dirname = dirname(__filename);

// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/public')));
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