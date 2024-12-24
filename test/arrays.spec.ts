import { wrapDefaults } from '../src/';
import { expect } from 'chai';

describe('Arrays', () => {
  it('should supply default values', () => {
    const a = wrapDefaults<number[], number>({
      wrap: [],
      defaultValue: 7,
    });

    expect(a[0]).to.equal(7);
    expect(a.length).to.equal(0);
  });

  it('should set undefined', () => {
    const a = wrapDefaults<number[], number>({
      wrap: [],
      defaultValue: 7,
      setUndefined: true,
    });

    expect(a[0]).to.equal(7);
    expect(a.length).to.equal(1);
  });

  it('should use setCriteria', () => {
    const a = wrapDefaults({
      wrap: [] as number[],
      defaultValue: 4,
      setCriteria: (v) => v > 10,
    });

    a[0] = 11;
    a[1] = -9;
    expect(a[0]).to.equal(4);
    expect(a[1]).to.equal(-9);
    expect(a.length).to.equal(2);
  });

  it('should handle push', () => {
    const a = wrapDefaults({
      wrap: [] as number[],
      defaultValue: 4,
      setCriteria: (v) => v > 10,
    });

    a.push(45);
    expect(a[0]).to.equal(4);
    expect(a.length).to.equal(1);
  });

  it('should handle pop', () => {
    const a = wrapDefaults({
      wrap: [] as number[],
      defaultValue: 4,
      setUndefined: true,
    });

    expect(a.length).to.equal(0);

    const pop = a.pop();

    expect(pop).to.equal(4);
    expect(a.length).to.equal(0);
  });

  it('should handle shift', () => {
    const a = wrapDefaults({
      wrap: [] as number[],
      defaultValue: 4,
      setUndefined: true,
    });

    expect(a.length).to.equal(0);

    const shift = a.shift();

    expect(shift).to.equal(4);
    expect(a.length).to.equal(0);
  });

  it('should handle unshift', () => {
    const a = wrapDefaults({
      wrap: [1, 2, 3, 4, 9],
      defaultValue: 4,
      setCriteria: (v) => v > 10,
    });

    a.unshift(45);

    expect(a[0]).to.equal(4);
    expect(a.length).to.equal(6);
  });

  it('should ignore length', () => {
    const a = wrapDefaults({
      wrap: [1, 2, 3, 4, 5],
      defaultValue: 4,
      setCriteria: (v) => v > 10,
    });

    a.length = 45;

    expect(a.length).to.equal(45);
  });

  it('should supply an array', () => {
    const a = wrapDefaults({
      wrap: [[1], [2], [3], [4], [5]],
      defaultValue: [10],
      setCriteria: (v) => v && v.length === 0,
    });

    a.push([]);

    const last = a[a.length - 1];

    expect(a.length).to.equal(6);
    expect(last).to.be.an('array');
    expect(last[0]).to.equal(10);
    expect(a[50]).to.be.an('array');
    expect(a[50][0]).to.be.equal(10);
  });
});
