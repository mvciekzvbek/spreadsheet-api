import LoggerProvider from '../../providers/LoggerProvider';
import { expect } from 'chai';

describe('LoggerProvider', () => {
  it('should have info function', () => {
    expect(typeof LoggerProvider.info).to.equal('function');
    expect(typeof LoggerProvider.error).to.equal('function');
  });
});
