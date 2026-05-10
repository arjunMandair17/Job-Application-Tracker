import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';
import pg from "pg";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
}

const { Pool } = pg;


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }  // Railway uses self-signed certs
});

// Abstract DB querying so route files don't manage connections directly.
export const query = async (text, params = []) => {
    const client = await pool.connect();
    try {
        const res = await client.query(text, params);
        return res;
    } catch (err) {
        console.error("Database query error:", err);
        throw err;
    } finally {
        client.release();
    }
};

export default pool;