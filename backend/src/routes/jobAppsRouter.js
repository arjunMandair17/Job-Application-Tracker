import express from 'express';
import multer from 'multer';
import {query} from '../postgresClient.js';


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
        const apps = await query(`SELECT * FROM jobapplications WHERE user_id = $1`, [req.session.userId]);

        const appsWithUrls = await Promise.all(
            apps.rows.map(async (app) => ({
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
        const app = await query(`SELECT * FROM jobapplications WHERE id = $1 AND user_id = $2`, [id, req.session.userId]);

        if (!app.rows[0]) {
            return res.status(404).json({ message: 'Job application not found' });
        }

        const resumeUrl = app.rows[0].filename ? await getResumeSignedUrl(app.rows[0].filename) : null;
        res.json({ ...app.rows[0], resumeUrl });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch job application', error: error.message });
    }
});

// add a job application
router.post('/', upload.single('resume'), async (req, res) => {
    try {
        const { title, company, description, date_applied, status, application_link } = req.body;
        const resume = req.file;

        if (!title || !company) {
            return res.status(400).json({ message: 'Title and company are required' });
        }

        const sqlInsertion = `INSERT INTO jobapplications (company, title, description, filename, date_applied, status, application_link, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`;

        const result = await query(sqlInsertion, [
            company,
            title,
            (description || ''),
            '',
            (date_applied || null),
            (status || null),
            (application_link || ''),
            req.session.userId
        ]);

        const appId = result.rows?.[0]?.id;
        if (!appId) {
            return res.status(500).json({ message: 'Failed to create job application' });
        }
        let resumeKey = '';

        if (resume) {

            resumeKey = buildResumeKey(req.session.userId, appId, resume.originalname);

            const putCommand = new PutObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: resumeKey,
                Body: resume.buffer,
                ContentType: resume.mimetype
            });

            const s3 = getS3Client();
            await s3.send(putCommand);

            const setResume = await query(`UPDATE jobapplications SET filename = $1 WHERE id = $2 AND user_id = $3`, [resumeKey, appId, req.session.userId]);
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
        const { title, company, description, date_applied, status, application_link } = req.body;
        const resume = req.file;

        const getExisting = await query(`SELECT * FROM jobapplications WHERE id = $1 AND user_id = $2`, [id, req.session.userId]);
        const existing = getExisting.rows[0];

        if (!existing) {
            return res.status(404).json({ message: 'Job application not found' });
        }

        let resumeKey = existing.filename;

        if (resume) {

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

        const updateAppSQL = `UPDATE jobapplications SET title = $1, company = $2, description = $3, filename = $4, date_applied = $5, status = $6, application_link = $7 WHERE id = $8 AND user_id = $9`;

        await query(updateAppSQL, [
            title || existing.title,
            company || existing.company,
            description || existing.description,
            resumeKey,
            date_applied || existing.date_applied,
            status || existing.status,
            application_link || existing.application_link,
            id,
            req.session.userId
        ]);

        const updatedResumeUrl = resumeKey ? await getResumeSignedUrl(resumeKey) : null;
        res.json({ message: 'Job application updated successfully', resumeUrl: updatedResumeUrl });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update job application', error: error.message });
    }
});



router.delete("/:id", async (req, res) => {
    try {

        // get the app first so we can find the S3 key for the resume
        const { id } = req.params;
        const getApp = await query(`SELECT * FROM jobapplications WHERE id = $1 AND user_id = $2`, [id, req.session.userId]);
        const app = getApp.rows[0];

        if(!app) {
            return res.status(404).json({ message: 'Job application not found' });
        }

        const resumeKey = app.filename;

        // delete the resume from S3 if it exists before deleting the app record from the database
        if (resumeKey && process.env.AWS_S3_BUCKET_NAME) {
            const s3 = getS3Client();
            const deleteCommand = new DeleteObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: resumeKey
            });
            await s3.send(deleteCommand);
        }

        // now that S3 is handled, delete the app from the database
        const deleteApp = await query(`DELETE FROM jobapplications WHERE id = $1 AND user_id = $2`, [id, req.session.userId]);

        if (deleteApp.rowCount === 0) {
            return res.status(404).json({ message: 'Job application not found' });
        }

        res.json({ message: 'Job application deleted successfully' });

    }catch (error) {
        res.status(500).json({ message: 'Failed to delete job application', error: error.message });
    }
});

export default router;