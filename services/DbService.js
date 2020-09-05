import 'dotenv/config';
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

async function savePreview({ uuid, preview }) {
  const now = new Date();
  const query = {
    text: 'INSERT INTO previews(uuid, preview, created_at) VALUES ($1, $2, $3) RETURNING *',
    values: [uuid, preview, now],
  };

  const { rows } = await pool.query(query);
  return rows[0];
}

async function getPreviewByUuid(uuid) {
  const query = {
    text: 'SELECT preview FROM previews WHERE uuid = $1',
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
