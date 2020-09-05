import CsvStrategy from './CsvStrategy';
import XlsStrategy from './XlsStrategy';
import {TEXT_CSV, TEXT_XLS} from '../config/extensions';

const StrategyMap = () => ({
  [TEXT_XLS]: XlsStrategy(),
  [TEXT_CSV]: CsvStrategy(),
});

export default StrategyMap;
