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

    expect(wrapped.has(7)).to.be.false;
    expect(wrapped.size).to.equal(0);

    wrapped.add(<any>undefined);

    expect(wrapped.has(7)).to.be.true;
    expect(wrapped.size).to.equal(1);
    expect(wrapped.has(<any>undefined)).to.be.false;
  });

  it('should use setCriteria', () => {
    const set = new Set<number>();

    const wrapped = wrapDefaults({
      wrap: set,
      defaultValue: 4,
      setCriteria: (v) => v > 10,
    });

    wrapped.add(11);
    wrapped.add(-9);

    expect(wrapped.has(4)).to.be.true;
    expect(wrapped.has(11)).to.be.false;
    expect(wrapped.has(-9)).to.be.true;
    expect(wrapped.size).to.equal(2);
  });
});
