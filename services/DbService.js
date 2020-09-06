import 'dotenv/config';
import dbProvider from '../providers/DbProvider';

async function savePreview({ preview }, url) {
  const now = new Date();
  const query = {
    text: 'INSERT INTO previews(preview, created_at, url) VALUES ($1, $2, $3) RETURNING *',
    values: [preview, now, url],
  };

  const { rows } = await dbProvider.query(query);
  return rows[0];
}

async function getPreviewByUuid(uuid) {
  const query = {
    text: 'SELECT preview, url FROM previews WHERE uuid = $1',
    values: [uuid],
  };

  const { rows } = await dbProvider.query(query);
  return rows[0];
}

const DbService = {
  savePreview,
  getPreviewByUuid,
};

export default DbService;
