import 'dotenv/config';

const DbService = (provider) => {
  async function savePreview({ preview }, url) {
    const now = new Date();
    const query = {
      text:
        'INSERT INTO previews(preview, created_at, url) VALUES ($1, $2, $3) RETURNING *',
      values: [preview, now, url],
    };

    const { rows } = await provider.query(query);
    return rows && rows[0];
  }

  async function getPreviewByUuid(uuid) {
    const query = {
      text: 'SELECT preview, url FROM previews WHERE uuid = $1',
      values: [uuid],
    };

    const { rows } = await provider.query(query);
    return rows && rows[0];
  }

  return {
    savePreview,
    getPreviewByUuid,
  };
};

export default DbService;
