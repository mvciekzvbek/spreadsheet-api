import DbService from '../services/DbService';
import dbProvider from '../providers/DbProvider';
import logger from '../providers/LoggerProvider';

export default {
  async findOne(req, res) {
    const { uuid } = req.params;
    const dbService = DbService(dbProvider);
    const record = await dbService.getPreviewByUuid(uuid);
    if (!record) {
      logger.error('Preview does not exist in database');
      return res.status(404).send({
        message: 'Preview does not exist in database'
      });
    }
    return res.status(200).send(record);
  },
};
