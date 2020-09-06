import csvParse from 'csv-parse';
import { ROWS } from '../config/constants';

const parser = csvParse({
  delimiter: ':',
});

const CsvStrategy = () => {
  const parse = (buffer) => {
    const output = [];

    parser.on('readable', () => {
      let record;
      let i = 0;

      do {
        record = parser.read();
        output.push(record);
        i += 1;
      } while (i < ROWS);
    });

    parser.on('error', (err) => {
      console.error(err.message);
    });

    parser.write(buffer);
    parser.end();

    return output;
  };

  return {
    parse,
  };
};

export default CsvStrategy;
