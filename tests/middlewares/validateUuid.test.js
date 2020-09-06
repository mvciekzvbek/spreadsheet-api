import { expect } from 'chai';
import validateUuid from '../../middlewares/validateUuid';

describe('reqID', () => {
  it('should validate uuid', () => {
    const req = {
      params: {
        uuid: 'abc',
      },
    };

    const isValidUuid = validateUuid(req, {}, () => {});
    expect(isValidUuid).to.equal(false);
  });
});
