import strategies from '../strategies';

class SpreadSheetService {
  constructor(file) {
    this.mimetype = file.mimetype;
    this.buffer = file.buffer;
  }

  preparePreview(records) {
    const preview = {
      th: [],
      tr: [],
    };

    for (let i = 0, j = records.length; i < j; i++) {
      const parts = records[i][0].split(';');
      if (i === 0) {
        preview.th = parts;
      } else {
        preview.tr.push(parts);
      }
    }

    return preview;
  }

  generatePreview() {
    const parsed = strategies[this.mimetype].parse(this.buffer);
    return this.preparePreview(parsed);
  }
}

export default SpreadSheetService;
