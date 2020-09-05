import { v4 as uuidv4 } from 'uuid';

class SpreadSheetPreview {
  constructor(preview) {
    this.preview = preview;
    this.uuid = uuidv4();
  }
}

export default SpreadSheetPreview;
