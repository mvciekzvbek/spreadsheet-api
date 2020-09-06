import DbProvider from '../../providers/DbProvider';
import { expect } from 'chai';

describe('DbProvider', () => {
  it('should have query function', () => {
    expect(typeof DbProvider.query).to.equal('function');
  });
});
