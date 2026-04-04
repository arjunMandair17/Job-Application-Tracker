import  express  from 'express';
import expressSession from 'express-session';
import bcrypt from 'bcryptjs';

const router =  express.Router();

// Register route
router.post('/register', (req,res) =>{
    const {username, password} = req.body;

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`);
    const userId = user.run(username, hashedPassword).lastInsertRowid;

    req.session.userId = userId; // Store user ID in session

    res.json({message: 'User registered successfully'});
})

// Login route
router.post('/login', (req,res) =>{
    const {username, password} = req.body;
    const hashedPW = bcrypt.hashSync(password, 10);

    const user = db.prepare(`SELECT * FROM users WHERE username = ?`);
    const validateUser = user.get(username);

    if(!validateUser) return res.status(404).json({message: 'User not found'});

    const valid = bcrypt.compareSync(password, validateUser.password);
    if(valid){
        req.session.userId = validateUser.id; // Store user ID in session
        res.json({message: 'Login successful'});
    }else{
        res.status(401).json({message: 'Incorrect password'});
    }
})

// Logout route
router.post('/logout', (req,res) =>{
    req.session.destroy(err => {
        if(err) return res.status(500).json({message: 'Logout failed'});
        res.json({message: 'Logout successful'});
    });
})

export default router;