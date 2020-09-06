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
      _status: null,
      _json: null,
      send (json) {
        this._json = json
        return this;
      },
      status (code) {
        this._status = code;
        return this;
      }
    };

    validateUuid(req, res, next);
    expect(next.getCalls()).to.deep.equal([]);
    expect(res._status).to.equal(400);
    expect(res._json).to.deep.equal({message: 'UUID is not valid'});
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
