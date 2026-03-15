import { wrapDefaults } from '../src/';
import { expect } from 'chai';

describe('WeakMap', () => {
  it('should use a weakmap as a wrapped value', () => {
    const map = new WeakMap<Record<string, any>, number>();
    const key: Record<string, any> = {};

    const wrapped = wrapDefaults({
      wrap: map,
      defaultValue: 7,
    });

    expect(wrapped).to.be.instanceOf(WeakMap);

    expect(wrapped.has(key)).to.be.false;
    expect(wrapped.get(key)).to.equal(7);
  });

  it(`should set array values when undefined`, () => {
    const map = new WeakMap<Function, Array<Object>>();

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

  it('should handle complex structures', () => {
    type Subscription = Record<string, any>;
    type Searches = { activeSearches: Map<string, Subscription> };

    const wrapped = wrapDefaults<WeakMap<Record<string, any>, Searches>, Searches>({
      wrap: new WeakMap(),
      defaultValue: (): Searches => ({
        activeSearches: new Map<string, Subscription>(),
      }),
      execute: true,
      setUndefined: true,
    });

    const socket: Record<string, any> = {};

    const searches = wrapped.get(socket)!;
    expect(searches).to.be.an('object');
    expect(searches.activeSearches).to.be.an('map');

    const socket2 = {};
    expect(wrapped.has(socket2)).to.be.false;

    const searches2 = wrapped.get(socket2)!;
    expect(searches2).to.be.an('object');
    expect(searches2.activeSearches).to.be.an('map');

    expect(wrapped.has(socket)).to.be.true;
    expect(wrapped.has(socket2)).to.be.true;

    expect(searches).to.equal(wrapped.get(socket));
    expect(searches2).to.equal(wrapped.get(socket2));

    expect(searches).to.not.equal(searches2);
  });
});
