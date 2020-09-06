import { expect } from 'chai';
import addRequestId from '../../middlewares/requestId';

describe('requestTime', () => {
  it('should add time property to request', () => {
    const req = {};

    addRequestId(
      req,
      () => {},
      () => {},
    );
    expect(req.id).to.be.string;
  });
});
