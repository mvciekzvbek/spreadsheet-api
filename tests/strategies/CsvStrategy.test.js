import CsvStrategy from '../../strategies/CsvStrategy';
import { expect } from 'chai';

describe('CsvSrategy', () => {
  let csvStrategy;

  beforeEach(() => {
    csvStrategy = CsvStrategy();
  });

  afterEach(() => {
    csvStrategy = undefined;
  });

  it('should have parse function', () => {
    expect(typeof csvStrategy.parse).to.equal('function');
  });

  it('should parse short buffer properly', () => {
    const buffStr = 'Imie;Nazwisko;Wiek\nJan;Kowalski;23';
    const buf = Buffer.from(buffStr);
    const parsed = csvStrategy.parse(buf);
    expect(parsed[0]).to.deep.equal(['Imie;Nazwisko;Wiek']);
    expect(parsed[1]).to.deep.equal(['Jan;Kowalski;23']);
  });

  it('should parse longer buffer properly', () => {
    const buffStr =
      'Imie;Nazwisko;Wiek\nJan;Kowalski;23\nMaciej;Kowalski;24\nTomasz;Kowalski;25' +
      '\nAdrian;Kowalski;26\nPaweł;Kowalski;27\nDawid;Kowalski;28';
    const buf = Buffer.from(buffStr);
    const parsed = csvStrategy.parse(buf);
    expect(parsed[0]).to.deep.equal(['Imie;Nazwisko;Wiek']);
    expect(parsed[1]).to.deep.equal(['Jan;Kowalski;23']);
    expect(parsed[2]).to.deep.equal(['Maciej;Kowalski;24']);
    expect(parsed[3]).to.deep.equal(['Tomasz;Kowalski;25']);
    expect(parsed[4]).to.deep.equal(['Adrian;Kowalski;26']);
    expect(parsed[5]).to.deep.equal(['Paweł;Kowalski;27']);
  });
});
