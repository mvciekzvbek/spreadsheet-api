import DbService from '../services/DbService';
import S3Service from '../services/S3Service';
import SpreadSheetPreview from '../models/SpreadSheetPreview';
import s3Provider from '../providers/S3Provider';
import dbProvider from '../providers/DbProvider';
import ChildProcessService from '../services/ChildProcessService';
import { WORKER_PATH } from '../config/constants';

export default {
  async upload(req, res) {
    if (!req.file) {
      return res.status(400);
    }

    const dbService = DbService(dbProvider);
    const s3Service = S3Service(s3Provider);

    ChildProcessService.delegate(WORKER_PATH, req.file, async (err, preview) => {
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
    });
  },
};
