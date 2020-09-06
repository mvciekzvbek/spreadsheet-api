import SpreadSheetService from '../services/SpreadSheetService';
import DbService from '../services/DbService';
import S3Service from '../services/S3Service';
import SpreadSheetPreview from '../models/SpreadSheetPreview';
import s3Provider from '../providers/S3Provider';
import dbProvider from '../providers/DbProvider';
import strategiesProvider from '../strategies';


export default {
  async upload(req, res) {
    if (!req.file) {
      return res.status(400);
    }

    const spreadSheetService = new SpreadSheetService(strategiesProvider, req.file);
    const s3Service = S3Service(s3Provider);
    const dbService = DbService(dbProvider);
    const preview = spreadSheetService.generatePreview();
    const spreadSheetPreview = new SpreadSheetPreview(preview);

    const response = await s3Service.upload(
      spreadSheetPreview.uuid,
      req.file.buffer,
      req.file.mimetype,
    );

    if (!response || !response.Location) {
      return res.status(400);
    }

    const record = await dbService.savePreview(
      spreadSheetPreview,
      response.Location,
    );

    if (!record) {
      return res.status(400);
    }

    return res.status(201).send({
      uuid: record.uuid,
    });
  },
};
