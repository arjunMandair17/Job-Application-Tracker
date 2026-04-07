import { DatabaseSync } from "node:sqlite";
const db = new DatabaseSync(":memory:");

// Users table
db.exec(`
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )
`);

// Job applications table
db.exec(`
    CREATE TABLE jobApplications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        company TEXT,
        description TEXT,
        date_applied TEXT,
        status TEXT,
        filename TEXT,
        user_id INTEGER,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )
`)

export default db;