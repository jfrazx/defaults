import { wrapDefaults } from '../src';
import { expect } from 'chai';

describe('MapValueHandler', () => {
  it('should utilize a map as a default value', () => {
    const defaults = wrapDefaults<
      { [key: string]: Map<number, number> },
      Map<number, number>
    >({
      wrap: {},
      defaultValue: new Map<number, number>(),
    });

    expect(defaults.content).to.be.instanceOf(Map);
    expect(defaults.content.size).to.equal(0);
    expect('content' in defaults).to.be.false;
  });

  it('should copy content from a map', () => {
    const map = new Map<number, number>();

    map.set(1, 4);
    map.set(2, 3);
    map.set(3, 2);
    map.set(4, 1);

    const defaults = wrapDefaults<
      { [key: string]: Map<number, number> },
      Map<number, number>
    >({
      wrap: {},
      defaultValue: map,
    });

    expect(defaults.content).to.be.instanceOf(Map);
    expect(defaults.content.size).to.equal(4);

    map.forEach((value) => {
      expect(defaults.content.has(value)).to.be.true;
    });
  });

  it('should clone complex keys', () => {
    const key = { test: 'value' };
    const map = new Map<{ [key: string]: string }, string>();

    map.set(key, 'key values');

    const wrapped = wrapDefaults<
      { [key: string]: Map<{ [key: string]: string }, string> },
      Map<{ [key: string]: string }, string>
    >({
      defaultValue: map,
      reuseMapKey: false,
    });

    const [cloneKey] = wrapped.something.keys();

    expect(wrapped.test).to.be.instanceOf(Map);
    expect(wrapped.content).to.not.equal(map);
    expect(cloneKey).to.not.equal(key);
    expect(cloneKey.test).to.equal('value');
  });
});
