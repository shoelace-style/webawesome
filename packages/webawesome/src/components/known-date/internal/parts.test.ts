import { expect } from '@open-wc/testing';
import { EMPTY_PARTS, isComplete, isEmpty, isoToParts, partsToIso } from './parts.js';

describe('known-date/parts', () => {
  describe('partsToIso', () => {
    it('composes a simple date', () => {
      expect(partsToIso({ day: '27', month: '3', year: '2007' })).to.equal('2007-03-27');
    });

    it('normalizes zero-padded user input', () => {
      expect(partsToIso({ day: '07', month: '03', year: '2007' })).to.equal('2007-03-07');
    });

    it('returns empty for incomplete parts', () => {
      expect(partsToIso({ day: '1', month: '', year: '2024' })).to.equal('');
      expect(partsToIso({ day: '', month: '5', year: '2024' })).to.equal('');
      expect(partsToIso({ day: '15', month: '5', year: '' })).to.equal('');
      expect(partsToIso(EMPTY_PARTS)).to.equal('');
    });

    it('rejects out-of-range fields', () => {
      expect(partsToIso({ day: '0', month: '5', year: '2024' })).to.equal('');
      expect(partsToIso({ day: '32', month: '5', year: '2024' })).to.equal('');
      expect(partsToIso({ day: '15', month: '0', year: '2024' })).to.equal('');
      expect(partsToIso({ day: '15', month: '13', year: '2024' })).to.equal('');
      expect(partsToIso({ day: '15', month: '5', year: '0' })).to.equal('');
      expect(partsToIso({ day: '15', month: '5', year: '10000' })).to.equal('');
    });

    it('rejects non-existent calendar dates', () => {
      expect(partsToIso({ day: '30', month: '2', year: '2024' })).to.equal('');
      expect(partsToIso({ day: '31', month: '4', year: '2024' })).to.equal('');
      expect(partsToIso({ day: '31', month: '6', year: '2024' })).to.equal('');
    });

    it('handles leap years correctly', () => {
      expect(partsToIso({ day: '29', month: '2', year: '2024' })).to.equal('2024-02-29');
      expect(partsToIso({ day: '29', month: '2', year: '2000' })).to.equal('2000-02-29');
      expect(partsToIso({ day: '29', month: '2', year: '2023' })).to.equal('');
      expect(partsToIso({ day: '29', month: '2', year: '1900' })).to.equal('');
    });

    it('handles year boundaries', () => {
      expect(partsToIso({ day: '1', month: '1', year: '1' })).to.equal('0001-01-01');
      expect(partsToIso({ day: '31', month: '12', year: '9999' })).to.equal('9999-12-31');
    });

    it('rejects non-numeric input', () => {
      expect(partsToIso({ day: 'abc', month: '5', year: '2024' })).to.equal('');
      expect(partsToIso({ day: '15', month: 'xyz', year: '2024' })).to.equal('');
    });
  });

  describe('isoToParts', () => {
    it('splits a canonical ISO date', () => {
      expect(isoToParts('2007-03-27')).to.deep.equal({ year: '2007', month: '03', day: '27' });
    });

    it('returns empty parts for empty input', () => {
      expect(isoToParts('')).to.deep.equal(EMPTY_PARTS);
    });

    it('returns empty parts for malformed input', () => {
      expect(isoToParts('not-a-date')).to.deep.equal(EMPTY_PARTS);
      expect(isoToParts('2007/03/27')).to.deep.equal(EMPTY_PARTS);
      expect(isoToParts('2007-3-27')).to.deep.equal(EMPTY_PARTS);
    });
  });

  describe('isComplete / isEmpty', () => {
    it('isComplete is true only when all three fields are filled', () => {
      expect(isComplete({ day: '1', month: '1', year: '2024' })).to.be.true;
      expect(isComplete({ day: '', month: '1', year: '2024' })).to.be.false;
      expect(isComplete(EMPTY_PARTS)).to.be.false;
    });

    it('isEmpty is true only when no field is filled', () => {
      expect(isEmpty(EMPTY_PARTS)).to.be.true;
      expect(isEmpty({ day: '', month: '', year: '2024' })).to.be.false;
      expect(isEmpty({ day: '1', month: '1', year: '2024' })).to.be.false;
    });
  });
});
