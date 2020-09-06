import { expect } from 'chai';
import DbService from '../../services/DbService';
import sinon from 'sinon';

describe('DbService', () => {
  let provider, dbService;

  beforeEach(() => {
    provider = {
      query: sinon.spy(),
    };

    dbService = DbService(provider);
  });

  afterEach(() => {
    provider = undefined;
    dbService = undefined;
  });

  it('savePreview', () => {
    dbService.savePreview({ preview: {} }, 'abc');
    expect(provider.query.getCalls()[0].args[0].text).to.equal(
      'INSERT INTO previews(preview, created_at, url) VALUES ($1, $2, $3) RETURNING *',
    );
    expect(provider.query.getCalls()[0].args[0].values[0]).to.deep.equal({});
    expect(provider.query.getCalls()[0].args[0].values[0]).not.to.be.undefined;
    expect(provider.query.getCalls()[0].args[0].values[2]).to.deep.equal('abc');
  });

  it('getPreviewByUuid', () => {
    dbService.getPreviewByUuid('abc');
    expect(provider.query.getCalls()[0].args[0].text).to.equal(
      'SELECT preview, url FROM previews WHERE uuid = $1',
    );
    expect(provider.query.getCalls()[0].args[0].values).to.deep.equal(['abc']);
  });
});
