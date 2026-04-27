import express from 'express';
import multer from 'multer';
import db from '../db.js';


// AWS S3 setup
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const getS3Client = () => new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        if (!allowedMimes.includes(file.mimetype)) {
            cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
            return;
        }

        cb(null, true);
    }
});

const router = express.Router();


// helper to sanitize file names for S3 keys
const sanitizeFileName = (name = 'resume') =>
    name.replace(/[^a-zA-Z0-9._-]/g, '_');


// helper to build a unique S3 key for each uploaded resume
const buildResumeKey = (userId, appId, originalName) =>
    `resumes/${userId}/${appId}/${Date.now()}-${sanitizeFileName(originalName)}`;

// helper for fetching signed URLS for a resume
const getResumeSignedUrl = async (key) => {
    if (!process.env.AWS_S3_BUCKET_NAME || !key) return null;
    const s3 = getS3Client();

    const command = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key
    });

    return getSignedUrl(s3, command, { expiresIn: 900 });
};

// get all job applications for the logged in user
router.get('/', async (req, res) => {
    try {
        const getApps = db.prepare(`SELECT * FROM jobApplications WHERE user_id = ?`);
        const apps = getApps.all(req.session.userId);

        const appsWithUrls = await Promise.all(
            apps.map(async (app) => ({
                ...app,
                resumeUrl: app.filename ? await getResumeSignedUrl(app.filename) : null
            }))
        );

        res.json({ apps: appsWithUrls });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch job applications', error: error.message });
    }
});

// get a specific job application
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const getApp = db.prepare(`SELECT * FROM jobApplications WHERE id = ? AND user_id = ?`);
        const app = getApp.get(id, req.session.userId);

        if (!app) {
            return res.status(404).json({ message: 'Job application not found' });
        }

        const resumeUrl = app.filename ? await getResumeSignedUrl(app.filename) : null;
        res.json({ ...app, resumeUrl });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch job application', error: error.message });
    }
});

// add a job application
router.post('/', upload.single('resume'), async (req, res) => {
    try {
        const { title, company, description, date_applied, status } = req.body;
        const resume = req.file;

        if (!title || !company) {
            return res.status(400).json({ message: 'Title and company are required' });
        }

        const addApp = db.prepare(
            `INSERT INTO jobApplications (company, title, description, filename, date_applied, status, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)`
        );

        const result = addApp.run(
            company,
            title,
            (description || ''),
            '',
            (date_applied || null),
            (status || null),
            req.session.userId
        );

        const appId = result.lastInsertRowid;
        let resumeKey = '';

        if (resume) {
            if (!process.env.AWS_S3_BUCKET_NAME) {
                return res.status(500).json({ message: 'S3 bucket env var is missing' });
            }

            resumeKey = buildResumeKey(req.session.userId, appId, resume.originalname);

            const putCommand = new PutObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: resumeKey,
                Body: resume.buffer,
                ContentType: resume.mimetype
            });

            const s3 = getS3Client();
            await s3.send(putCommand);

            const setResume = db.prepare(`UPDATE jobApplications SET filename = ? WHERE id = ? AND user_id = ?`);
            setResume.run(resumeKey, appId, req.session.userId);
        }

        const resumeUrl = resumeKey ? await getResumeSignedUrl(resumeKey) : null;
        res.status(201).json({ message: 'Job application added successfully', appId, resumeUrl });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add job application', error: error.message });
    }
});

// update a job application
router.put('/:id', upload.single('resume'), async (req, res) => {
    try {
        const { id } = req.params;
        const { title, company, description, date_applied, status } = req.body;
        const resume = req.file;

        const getExisting = db.prepare(`SELECT * FROM jobApplications WHERE id = ? AND user_id = ?`);
        const existing = getExisting.get(id, req.session.userId);

        if (!existing) {
            return res.status(404).json({ message: 'Job application not found' });
        }

        let resumeKey = existing.filename;

        if (resume) {
            if (!process.env.AWS_S3_BUCKET_NAME) {
                return res.status(500).json({ message: 'S3 bucket env var is missing' });
            }

            resumeKey = buildResumeKey(req.session.userId, id, resume.originalname);

            const putCommand = new PutObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: resumeKey,
                Body: resume.buffer,
                ContentType: resume.mimetype
            });

            const s3 = getS3Client();
            await s3.send(putCommand);

            if (existing.filename) {
                const deleteCommand = new DeleteObjectCommand({
                    Bucket: process.env.AWS_S3_BUCKET_NAME,
                    Key: existing.filename
                });
                await s3.send(deleteCommand);
            }
        }

        const updateApp = db.prepare(
            `UPDATE jobApplications SET title = ?, company = ?, description = ?, filename = ?, date_applied = ?, status = ? WHERE id = ? AND user_id = ?`
        );

        updateApp.run(
            title || existing.title,
            company || existing.company,
            description || existing.description,
            resumeKey,
            date_applied || existing.date_applied,
            status || existing.status,
            id,
            req.session.userId
        );

        const updatedResumeUrl = resumeKey ? await getResumeSignedUrl(resumeKey) : null;
        res.json({ message: 'Job application updated successfully', resumeUrl: updatedResumeUrl });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update job application', error: error.message });
    }
});

export default router;