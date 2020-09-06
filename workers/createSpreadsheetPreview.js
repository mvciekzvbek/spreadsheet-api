import SpreadSheetService from '../services/SpreadSheetService';
import strategiesProvider from '../strategies';

process.on('message', (file) => {
  const spreadSheetService = new SpreadSheetService(strategiesProvider, file);
  const preview = spreadSheetService.generatePreview();
  process.send(preview);
});
