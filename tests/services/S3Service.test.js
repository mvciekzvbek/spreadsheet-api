import { expect } from 'chai';
import S3Service from '../../services/S3Service';
import sinon from 'sinon';

describe('S3Service', () => {
  let provider, s3Service;

  beforeEach(() => {
    provider = {
      upload: sinon.spy(),
    };
    s3Service = S3Service(provider);
  });

  afterEach(() => {
    provider = undefined;
    s3Service = undefined;
  });

  it('should call upload function', () => {
    s3Service.upload('abc', 'def', 'ghi');
    expect(provider.upload.getCalls()[0].args[0]).to.have.property('Bucket');
    expect(provider.upload.getCalls()[0].args[0]).to.have.property('Key');
    expect(provider.upload.getCalls()[0].args[0]).to.have.property(
      'ContentType',
    );
    expect(provider.upload.getCalls()[0].args[0]).to.have.property('Body');
  });
});
