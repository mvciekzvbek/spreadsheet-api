class SpreadSheetService {
  constructor(strategies, file) {
    this.strategies = strategies;
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
    const hasStrategy = !!this.strategies[this.mimetype];

    if (!hasStrategy) {
      throw new Error(`Strategy for ${this.mimetype} missing`);
    }

    const parsed = this.strategies[this.mimetype].parse(this.buffer);
    return this.preparePreview(parsed);
  }
}

export default SpreadSheetService;
