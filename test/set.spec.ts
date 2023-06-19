import { wrapDefaults } from '../src/';
import { expect } from 'chai';

describe('Set', () => {
  it('should use a set as a wrapped value', () => {
    const set = new Set<number>();

    const wrapped = wrapDefaults({
      wrap: set,
      defaultValue: 7,
    });

    expect(wrapped).to.be.instanceOf(Set);

    expect(wrapped.has(9)).to.be.false;
    expect(wrapped.size).to.equal(0);
  });

  it('should not set primitive values when undefined', () => {
    const set = new Set<number>();

    const wrapped = wrapDefaults({
      wrap: set,
      defaultValue: 7,
      setUndefined: true,
    });

    expect(wrapped).to.be.instanceOf(Set);

    expect(wrapped.has(9)).to.be.false;
  });

  it(`should not set array values when undefined`, () => {
    const set = new Set<Array<Object>>();

    const wrapped = wrapDefaults({
      wrap: set,
      defaultValue: [],
      setUndefined: true,
    });

    const arr = [];

    expect(wrapped.has(arr)).to.be.false;
    expect(wrapped.has(arr)).to.be.false;
  });
});
