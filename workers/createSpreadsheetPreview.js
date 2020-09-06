import SpreadSheetService from '../services/SpreadSheetService';
import strategiesProvider from '../strategies';

process.on('message', (file) => {
  const spreadSheetService = new SpreadSheetService(strategiesProvider, file);
  const preview = {
    data: null,
    errors: []
  };

  try {
    preview.data = spreadSheetService.generatePreview();
  } catch (e) {
    preview.errors.push(e);
  }
  process.send(preview);
});
