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
    CREATE TABLE job-apps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        company TEXT,
        description TEXT,
        filename TEXT,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )
`)