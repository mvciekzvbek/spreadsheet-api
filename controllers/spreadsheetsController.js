import SpreadSheetService from '../services/SpreadSheetService';
import DbService from '../services/DbService';
import S3Service from '../services/S3Service';
import SpreadSheetPreview from '../models/SpreadSheetPreview';
import s3Provider from '../providers/S3Provider';
import dbProvider from '../providers/DbProvider';
import strategiesProvider from '../strategies';
import logger from '../providers/LoggerProvider';

export default {
  async upload(req, res) {
    if (!req.file) {
      logger.error('File is missing');
      return res.status(400).send({
        message: 'File is missing',
      });
    }

    const spreadSheetService = new SpreadSheetService(
      strategiesProvider,
      req.file,
    );
    const s3Service = S3Service(s3Provider);
    const dbService = DbService(dbProvider);

    let preview;

    try {
      preview = spreadSheetService.generatePreview();
    } catch (e) {
      logger.error('Unable to generate preview');
      return res.status(400).send({
        message: 'Unable to generate preview',
      });
    }

    const spreadSheetPreview = new SpreadSheetPreview(preview);

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
  },
};
