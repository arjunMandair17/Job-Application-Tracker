import express from 'express';
import multer from 'multer';

const upload = multer('/uploads');  // Configure multer to save uploaded files to the S3 bucket (?)

const router = express.Router();

// get all job applications for the logged in user
router.get('/', (req, res) => {
    const getApps = db.prepare(`SELECT * FROM jobApplications WHERE user_id = ?`);
    const apps = getApps.all(req.session.userId);

    // get the file URLS from the S3 bucket (?)

    const result = {apps, files: 'placeholder'};
    res.json(result);
});

// get a specific job application
router.get('/:id', (req, res) => {
    const {id} = req.params;
    const getApp = db.prepare(`SELECT * FROM jobApplications WHERE id = ? AND user_id = ?`);
    const app = getApp.get(id, req.session.userId);

    // use the filename to get the file from the S3 bucket (?)

    res.json(app);
});

// add a job application
router.post('/', upload.single('resume'), (req, res) => {
    const {title, company, description, filename} = req.body;
    const resume = req.file;  // Access the uploaded file

    const addApp = db.prepare(`INSERT INTO jobApplications (company, title, description, filename, user_id) VALUES (?, ?, ?, ?, ?)`);
    const result = addApp.run(company, title, description, filename, req.session.userId);

    // add the file to the S3 bucket (?)

    res.json({message: 'Job application added successfully', appId: result.lastInsertRowid});
});

// update a job application
router.put('/:id', upload.single('resume'), (req, res) => {
    const {id} = req.params;
    const {title, company, description, filename} = req.body;
    const resume = req.file;  // Access the updated file

    const updateApp = db.prepare(`UPDATE jobApplications SET title = ?, company = ?, description = ?, filename = ? WHERE id = ? AND user_id = ?`);
    const result = updateApp.run(title, company, description, filename, id, req.session.userId);

    // update the file in the S3 bucket if a new file was uploaded (?)

    if (result.changes === 0) {
        return res.status(404).json({message: 'Job application not found'});
    }

    res.json({message: 'Job application updated successfully'});
});

export default router;