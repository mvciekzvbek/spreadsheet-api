import { expect } from 'chai';
import SpreadSheetService from '../../services/SpreadSheetService';
import strategyProvider from '../../strategies';

describe('SpreadSheetService', () => {
  it('should generate preview from header and 5 rows', () => {
    const buffStr =
      'Imie;Nazwisko;Wiek\nJan;Kowalski;23\nMaciej;Kowalski;24\nTomasz;Kowalski;25' +
      '\nAdrian;Kowalski;26\nPaweł;Kowalski;27\nDawid;Kowalski;28';

    const file = {
      mimetype: 'text/csv',
      buffer: Buffer.from(buffStr),
    };

    const output = {
      th: ['Imie', 'Nazwisko', 'Wiek'],
      tr: [
        ['Jan', 'Kowalski', '23'],
        ['Maciej', 'Kowalski', '24'],
        ['Tomasz', 'Kowalski', '25'],
        ['Adrian', 'Kowalski', '26'],
        ['Paweł', 'Kowalski', '27'],
      ],
    };

    const spreadSheetService = new SpreadSheetService(
      strategyProvider,
      file,
      'text/csv',
    );
    const preview = spreadSheetService.generatePreview();
    expect(preview).to.deep.equal(output);
  });

  it('should generate preview from one row', () => {
    const buffStr = 'Imie;Nazwisko;Wiek\nJan;Kowalski;23';

    const file = {
      mimetype: 'text/csv',
      buffer: Buffer.from(buffStr),
    };

    const output = {
      th: ['Imie', 'Nazwisko', 'Wiek'],
      tr: [['Jan', 'Kowalski', '23']],
    };

    const spreadSheetService = new SpreadSheetService(
      strategyProvider,
      file,
      'text/csv',
    );
    const preview = spreadSheetService.generatePreview();
    expect(preview).to.deep.equal(output);
  });
});
