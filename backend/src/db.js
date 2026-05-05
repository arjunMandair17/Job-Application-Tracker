// this file is deprecated, it was used for SQLite db integration during development.
// the current version hosts a postgres database on Railway.
// however I am keeping it here for reference as to how the database is structured.

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
    CREATE TABLE jobapplications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        company TEXT,
        description TEXT,
        date_applied TEXT,
        status TEXT,
        filename TEXT,
        application_link TEXT,
        user_id INTEGER,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )
`)

export default db;