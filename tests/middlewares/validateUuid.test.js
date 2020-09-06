import { expect } from 'chai';
import sinon from 'sinon';
import { v4 as uuidv4 } from 'uuid';
import validateUuid from '../../middlewares/validateUuid';

describe('validateUuid', () => {
  it('should not call next', () => {
    const req = {
      params: {
        uuid: 'abc',
      },
    };

    const next = sinon.spy();
    const res = {
      sendStatus: sinon.spy(),
    };

    validateUuid(req, res, next);
    expect(next.getCalls()).to.deep.equal([]);
    expect(res.sendStatus.getCalls()[0].args[0]).to.equal(400);
  });

  it('should call next', () => {
    const req = {
      params: {
        uuid: uuidv4(),
      },
    };

    const next = sinon.spy();

    validateUuid(req, () => {}, next);
    expect(next.getCalls()).not.to.equal(0);
  });
});
