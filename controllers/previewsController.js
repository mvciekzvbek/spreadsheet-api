import DbService from '../services/DbService';

export default {
  async findOne(req, res) {
    const { uuid } = req.params;

    if (!uuid) {
      return res.status(400);
    }

    const record = await DbService.getPreviewByUuid(uuid);
    return record ? res.status(200).send(record)
      : res.sendStatus(404);
  },
};
