import  express  from 'express';
import bcrypt from 'bcryptjs';
import authMiddleware from '../middleware/authMiddleware.js';
import db from '../db.js';

const router =  express.Router();

// Register route
router.post('/register', (req,res) =>{
    const {username, password} = req.body;

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`);
    const userId = user.run(username, hashedPassword).lastInsertRowid;

    req.session.userId = userId; // Store user ID in session

    res.status(201).json({success: true ,message: 'User registered successfully'});
})

// Login route
router.post('/login', (req,res) =>{
    const {username, password} = req.body;
    const hashedPW = bcrypt.hashSync(password, 10);

    const user = db.prepare(`SELECT * FROM users WHERE username = ?`);
    const validateUser = user.get(username);

    if(!validateUser) return res.status(404).json({success: false, message: 'User not found'});

    const valid = bcrypt.compareSync(password, validateUser.password);
    if(valid){
        req.session.userId = validateUser.id; // Store user ID in session
        res.json({success: true, message: 'Login successful'});
    }else{
        res.status(401).json({success: false, message: 'Incorrect password'});
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

export default router;