import { wrapDefaults } from '../src/';
import { expect } from 'chai';

describe('Map', () => {
  it('should use a map as a wrapped value', () => {
    const map = new Map<number, number>();

    const wrapped = wrapDefaults({
      wrap: map,
      defaultValue: 7,
    });

    expect(wrapped).to.be.instanceOf(Map);

    expect(wrapped.has(9)).to.be.false;
    expect(wrapped.get(9)).to.equal(7);
  });

  it('should set primitive map values when undefined', () => {
    const map = new Map<number, number>();

    const wrapped = wrapDefaults({
      wrap: map,
      defaultValue: 7,
      setUndefined: true,
    });

    expect(wrapped).to.be.instanceOf(Map);

    expect(wrapped.has(9)).to.be.false;
    expect(wrapped.get(9)).to.equal(7);
    expect(wrapped.has(9)).to.be.true;
  });

  it(`should set array values when undefined`, () => {
    const map = new Map<Function, Array<Object>>();

    const wrapped = wrapDefaults({
      wrap: map,
      defaultValue: [],
      setUndefined: true,
    });

    const f1 = () => {};

    expect(wrapped.has(f1)).to.be.false;

    const r1 = wrapped.get(f1)!;

    expect(r1).to.be.an('array');
    expect(r1).to.have.lengthOf(0);

    r1.push({});

    expect(wrapped.has(f1)).to.be.true;

    const r2 = wrapped.get(f1);

    expect(r1).to.equal(r2);
  });
});
