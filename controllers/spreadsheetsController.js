import SpreadSheetService from '../services/SpreadSheetService';
import DbService from '../services/DbService';
import SpreadSheetPreview from '../models/SpreadSheetPreview';

export default {
  async upload(req, res, next) {
    const spreadSheetService = new SpreadSheetService(req.file);
    const preview = spreadSheetService.getPreview();
    const spreadSheetPreview = new SpreadSheetPreview(preview);

    const record = await DbService.savePreview(spreadSheetPreview);
    return res.status(201).send({
      uuid: record.uuid,
    });
  },
};
