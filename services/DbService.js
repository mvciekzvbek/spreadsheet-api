import 'dotenv/config';
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

async function savePreview({ uuid, preview }, url) {
  const now = new Date();
  const query = {
    text: 'INSERT INTO previews(uuid, preview, created_at, url) VALUES ($1, $2, $3, $4) RETURNING *',
    values: [uuid, preview, now, url],
  };

  const { rows } = await pool.query(query);
  return rows[0];
}

async function getPreviewByUuid(uuid) {
  const query = {
    text: 'SELECT preview, url FROM previews WHERE uuid = $1',
    values: [uuid],
  };

  const { rows } = await pool.query(query);
  return rows[0];
}

const DbService = {
  savePreview,
  getPreviewByUuid,
};

export default DbService;
