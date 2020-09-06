import { expect } from 'chai';
import addRequestTime from '../../middlewares/requestTime';

describe('requestTime', () => {
  it('should add time property to request', () => {
    const req = {};

    addRequestTime(
      req,
      () => {},
      () => {},
    );
    expect(req.time).to.be.string;
  });
});
