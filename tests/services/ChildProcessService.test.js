import { expect } from 'chai';
import ChildProcessService from '../../services/ChildProcessService';

describe('ChildProcessService', () => {
  it('delegate', (done) => {
    ChildProcessService.delegate('tests/testWorker.js', {a: 1, b: 2}, async (sum) => {
      expect(sum).to.equal(3);
      done();
    })
  });
});
