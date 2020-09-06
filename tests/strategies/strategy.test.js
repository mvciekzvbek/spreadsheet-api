import strategies from '../../strategies';
import { expect } from 'chai';

describe('Strategies', () => {
  it('should have text/csv strategy', () => {
    expect(strategies.hasOwnProperty('text/csv')).to.be.true;
    expect(strategies['text/csv']).to.have.property('parse');
  });
  it('should have text/xls strategy', () => {
    expect(strategies.hasOwnProperty('text/xls')).to.be.true;
    expect(strategies['text/xls']).to.have.property('parse');
  });
});
