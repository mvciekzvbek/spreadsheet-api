import S3Provider from '../../providers/S3Provider';
import { expect } from 'chai';

describe('S3Provider', () => {
  it('should have upload function', () => {
    expect(typeof S3Provider.upload).to.equal('function');
  });
});
