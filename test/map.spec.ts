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

  it('should set undefined map values', () => {
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
});
