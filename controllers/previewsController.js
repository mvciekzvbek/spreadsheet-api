import DbService from '../services/DbService';
import dbProvider from '../providers/DbProvider';

export default {
  async findOne(req, res) {
    const { uuid } = req.params;
    const dbService = DbService(dbProvider);
    const record = await dbService.getPreviewByUuid(uuid);
    return record ? res.status(200).send(record) : res.sendStatus(404);
  },
};
