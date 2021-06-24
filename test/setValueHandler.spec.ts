import { wrapDefaults } from '../src/';
import { expect } from 'chai';

describe('SetValueHandler', () => {
  it('should utilize a set as a default value', () => {
    const defaults = wrapDefaults<{ [key: string]: Set<number> }, Set<number>>({
      wrap: {},
      defaultValue: new Set<number>(),
    });

    expect(defaults.content).to.be.instanceOf(Set);
    expect(defaults.content.size).to.equal(0);
    expect('content' in defaults).to.be.false;
  });

  it('should copy content from a set', () => {
    const set = new Set<number>();

    set.add(1);
    set.add(2);
    set.add(3);
    set.add(4);

    const defaults = wrapDefaults<{ [key: string]: Set<number> }, Set<number>>({
      wrap: {},
      defaultValue: set,
    });

    expect(defaults.content).to.be.instanceOf(Set);
    expect(defaults.content.size).to.equal(4);
  });

  it('should copy array content from a set', () => {
    const set = new Set<number[]>();

    set.add([1]);
    set.add([2]);
    set.add([3]);
    set.add([4]);

    const defaults = wrapDefaults<{ [key: string]: Set<number[]> }, Set<number[]>>({
      wrap: {},
      defaultValue: set,
    });

    const values = [...defaults.context.values()];

    expect(defaults.content).to.be.instanceOf(Set);
    expect(defaults.content.size).to.equal(4);

    values.forEach((value) => {
      expect(value).to.be.an('array');
      expect(value).to.have.lengthOf(1);
      expect(value[0]).to.be.a('number');
      expect(defaults.content.has(value)).to.be.false;
    });

    expect(defaults.content).not.to.equal(defaults.content);
  });

  it('should copy object content from a set', () => {
    const set = new Set<{ address: { city: string } }>();

    set.add({ address: { city: 'Somewhere1' } });
    set.add({ address: { city: 'Somewhere2' } });
    set.add({ address: { city: 'Somewhere3' } });
    set.add({ address: { city: 'Somewhere4' } });

    const defaults = wrapDefaults<
      { [key: string]: Set<{ address: { city: string } }> },
      Set<{ address: { city: string } }>
    >({
      wrap: {},
      defaultValue: set,
    });

    const values = [...defaults.context.values()];

    expect(defaults.content).to.be.instanceOf(Set);
    expect(defaults.content.size).to.equal(4);

    values.forEach((value) => {
      expect(value).to.be.an('object');
      expect(value.address).to.be.an('object');
      expect(value.address.city).to.be.a('string');
      expect(defaults.content.has(value)).to.be.false;
    });

    expect(defaults.content).not.to.equal(defaults.content);
  });

  it('should set object content from a set', () => {
    const set = new Set<{ address: { city: string } }>();

    set.add({ address: { city: 'Somewhere1' } });
    set.add({ address: { city: 'Somewhere2' } });
    set.add({ address: { city: 'Somewhere3' } });
    set.add({ address: { city: 'Somewhere4' } });

    const defaults = wrapDefaults<
      { [key: string]: Set<{ address: { city: string } }> },
      Set<{ address: { city: string } }>
    >({
      wrap: {},
      defaultValue: set,
      setUndefined: true,
    });

    expect(defaults.content).to.equal(defaults.content);
  });
});
