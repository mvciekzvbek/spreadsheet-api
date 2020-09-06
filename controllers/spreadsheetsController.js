import DbService from '../services/DbService';
import S3Service from '../services/S3Service';
import SpreadSheetPreview from '../models/SpreadSheetPreview';
import s3Provider from '../providers/S3Provider';
import dbProvider from '../providers/DbProvider';
import ChildProcessService from '../services/ChildProcessService';
import { WORKER_PATH } from '../config/constants';
import logger from '../providers/LoggerProvider';

export default {
  async upload(req, res) {
    if (!req.file) {
      logger.error('File is missing');
      return res.status(400).send({
        message: 'File is missing',
      });
    }
    const dbService = DbService(dbProvider);
    const s3Service = S3Service(s3Provider);

    ChildProcessService.delegate(WORKER_PATH, req.file, async (preview) => {

      if (preview.errors.length > 0) {
        logger.error('Unable to generate preview');
        return res.status(400).send({
          message: 'Unable to generate preview',
        });
      }

      const spreadSheetPreview = new SpreadSheetPreview(preview.data);

      const response = await s3Service.upload(
        spreadSheetPreview.uuid,
        req.file.buffer,
        req.file.mimetype,
      );

      if (!response || !response.Location) {
        logger.error('Unable to upload file to S3');
        return res.status(400).send({
          message: 'Unable to upload file to S3',
        });
      }

      const record = await dbService.savePreview(
        spreadSheetPreview,
        response.Location,
      );

      if (!record) {
        logger.error('Unable to save preview in database');
        return res.status(400).send({
          message: 'Unable to save preview in database',
        });
      }

      return res.status(201).send({
        uuid: record.uuid,
      });
    });
  },
};
