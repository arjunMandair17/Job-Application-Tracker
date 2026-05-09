import  express  from 'express';
import bcrypt from 'bcryptjs';
import authMiddleware from '../middleware/authMiddleware.js';
import {query} from '../postgresClient.js';

// for authorization with google, need to verify the token sent from the frontend via the oAuth API
const { OAuth2Client } = await import('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const router =  express.Router();

// Register route
router.post('/register', async (req,res) =>{
    try {
        const {username, password} = req.body;

        // Password must be 12+ chars with uppercase, lowercase, number, and optional special chars
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{12,}$/;
        const usernameRegex = /^[a-zA-Z0-9_]{1,20}$/; // 1-20 chars, letters, numbers, underscores only

        if(username === "" || password === "" || username.length > 20 || !passwordRegex.test(password) || !usernameRegex.test(username)){
            return res.status(400).json({success: false, message: 'Password must be at least 12 characters with uppercase, lowercase, and number'});
        }
        

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);

        const users = await query(`INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id`, [username, hashedPassword]);
        const userId = users.rows[0].id;

        req.session.userId = userId; // Store user ID in session

        res.status(201).json({success: true ,message: 'User registered successfully'});
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({success: false, message: 'Registration failed', error: err.message});
    }
})

// Login route
router.post('/login', async (req,res) =>{
    try {
        const {username, password} = req.body;

        const user = await query(`SELECT * FROM users WHERE username = $1`, [username]);
        const validateUser = user.rows[0];

        if(!validateUser) {
            return res.status(401).json({success: false, message: 'Incorrect username or password'});
        }

        // validate the password against the found user's encrypted one
        const valid = bcrypt.compareSync(password, validateUser.password);
        if(valid){
            req.session.userId = validateUser.id; // Store user ID in session
            res.json({success: true, message: 'Login successful'});
        }else{
            res.status(401).json({success: false, message: 'Incorrect username or password'});
        }
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({success: false, message: 'Login failed'});
    }
})

// Logout route
router.post('/logout', (req,res) =>{
    req.session.destroy(err => {
        if(err) return res.status(500).json({success: false, message: 'Logout failed'});
        res.json({success: true, message: 'Logout successful'});
    });
})

// Session check route
router.get('/session', authMiddleware, async (req, res) => {
    res.sendStatus(200);    // if the user has an active session, this route will run after authMiddleware, which confirms it
})

router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await query(`SELECT id, username FROM users WHERE id = $1`, [req.session.userId]);
        const userRow = user.rows[0];

        if (!userRow) {
            return res.status(404).json({success: false, message: 'User not found'});
        }

        return res.json({success: true, user: userRow});
    } catch (error) {
        return res.status(500).json({success: false, message: 'Failed to fetch user profile', error: error.message});
    }
});

router.post('/google', async (req, res) => {
    const { credential } = req.body;

    try {
        // verifies against Google and returns the user's info if the token is valid
        const response = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
    
        const payload = response.getPayload();
        const {email, name, sub:googleId} = payload;

        // see if this user exists, if not then create a new user with their googleId as an identifier
        let user = await query(`SELECT * FROM users WHERE google_id = $1`, [googleId]);
        if (!user.rows[0]) {
            user = await query(`INSERT INTO users (username, google_id) VALUES ($1, $2) RETURNING id`, [name, googleId]);
        }

        req.session.userId = user.rows[0].id; // Store user ID in session
        res.json({success: true, message: 'Google login successful'});
    } catch (error) {
        console.error('Google login error:', error);
        return res.status(400).json({success: false, message: 'Google login failed'});
    }
});

export default router;