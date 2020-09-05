import SpreadSheetService from '../services/SpreadSheetService';
import DbService from '../services/DbService';
import SpreadSheetPreview from '../models/SpreadSheetPreview';
import StrategyMap from '../strategies';

export default {
  async upload(req, res, next) {
    const strategies = StrategyMap();
    const spreadSheetService = new SpreadSheetService(strategies, req.file);
    const preview = spreadSheetService.getPreview();
    const spreadSheetPreview = new SpreadSheetPreview(preview);
    const dbService = DbService();
    const record = await dbService.savePreview(spreadSheetPreview);
    return res.status(201).send({
      uuid: record.uuid,
    });
  },
};
