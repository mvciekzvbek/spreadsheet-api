import { expect } from 'chai';
import { validate as uuidValidate } from 'uuid';
import SpreadSheetPreview from '../../models/SpreadSheetPreview';

describe('SpreadSheetPreview', () => {
  it('should create SpreadSheetPreview instance correctly', () => {
    const spreadSheetPreview = new SpreadSheetPreview('abc');
    expect(spreadSheetPreview.preview).to.equal('abc');
    expect(uuidValidate(spreadSheetPreview.uuid)).to.be.true;
  });
});
