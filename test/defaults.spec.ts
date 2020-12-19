import { wrapDefaults, Defaults } from '../src';
import { expect } from 'chai';

describe('Defaults', () => {
  describe('defaultValue', () => {
    it('should supply undefined as default when directly using Defaults class', () => {
      const d: any = new Defaults();

      expect(d).to.be.an('object');
      expect(d.value).to.be.undefined;
    });

    it('should supply undefined as a default value', () => {
      let d: any = Defaults.wrap();

      expect(d).to.be.an('object');
      expect(d.value).to.be.undefined;

      d = wrapDefaults();

      expect(d).to.be.an('object');
      expect(d.value).to.be.undefined;
    });

    it('should should allow user defined defaults', () => {
      let d: any = Defaults.wrap({ defaultValue: 10 });
      expect(d.value).to.equal(10);

      d = wrapDefaults({ defaultValue: 'string default content' });
      expect(d.value).to.equal('string default content');

      d = wrapDefaults({ defaultValue: [] });
      expect(d.value).to.be.an('array');

      d = wrapDefaults({ defaultValue: {} });
      expect(d.value).to.be.an('object');
    });
  });

  describe('setCriteria', () => {
    it('should receive the value, property and unwrapped object', () => {
      const unwrapped = {};
      const setValue = 10;
      const defaults: any = wrapDefaults({
        wrap: unwrapped,
        defaultValue: 0,
        setCriteria: (value, property, object) => {
          expect(value).to.equal(setValue);
          expect(property).to.be.a('string');
          expect(object).to.equal(unwrapped);
          expect(object).to.not.equal(defaults);
          return value < 10;
        },
      });

      defaults.value = setValue;
    });

    it('should allow criteria to determine value used', () => {
      let d: any = wrapDefaults({ defaultValue: 0 });

      d.value = -999;

      expect(d.value).to.equal(-999);

      d = wrapDefaults({ defaultValue: 0, setCriteria: (v) => v < 0 });

      d.value = -999;

      expect(d.value).to.equal(0);
    });

    it('should allow defined criteria to be ignored', () => {
      const d: any = wrapDefaults({
        defaultValue: 0,
        setCriteria: (v) => v < 0,
      });

      d.value = { ignoreDefaultCriteria: true, value: -10 };

      expect(d.value).to.equal(-10);
    });
  });

  describe('setUndefined', () => {
    it('should set default values for undefined', () => {
      let d: any = wrapDefaults({ defaultValue: 0 });
      const prop = 'value';

      expect(d.value).to.equal(0);
      expect(prop in d).to.be.false;

      d = wrapDefaults({ defaultValue: 0, setUndefined: true });

      expect(d.value).to.equal(0);
      expect(prop in d).to.be.true;
    });

    it('should not have a property which has not been accessed', () => {
      const d = wrapDefaults({ defaultValue: 0, setUndefined: true });
      const prop = 'value';

      expect(prop in d).to.be.false;
    });

    it('should set and continue using a default array', () => {
      const content = 'this is some default content';
      const d: any = wrapDefaults({ defaultValue: [], setUndefined: true });

      expect(d.stuff.push(content)).to.equal(1);
      expect(d.stuff.push(content)).to.equal(2);
      expect(d.stuff).to.have.lengthOf(2);
    });

    it('should set and continue using a default object', () => {
      const sym1 = Symbol('one');
      const sym2 = Symbol('two');
      const defaultValue = {
        [sym1]: [],
        [sym2]: [],
        point: {
          lat: 23.324,
          long: 65.332,
        },
      };
      const d: any = wrapDefaults({ defaultValue, setUndefined: true });
      const { event } = d;

      expect(d.event[sym1].push(sym1)).to.equal(1);
      expect(d.event[sym1].push(sym2)).to.equal(2);
      expect(d.event[sym2].push(sym1)).to.equal(1);
      expect(d.event[sym2].push(sym2)).to.equal(2);

      expect(event).to.equal(d.event);
      expect(event[sym1]).to.equal(d.event[sym1]);
      expect(event[sym2]).to.equal(d.event[sym2]);

      expect(d.event[sym1]).to.have.lengthOf(2);
      expect(d.event[sym2]).to.have.lengthOf(2);
    });
  });

  describe('shallowCopy', () => {
    it('should create shallow copies by default', () => {
      let complex: any = wrapDefaults({
        defaultValue: [[2.345, 43.53]],
        setUndefined: true,
      });

      expect(complex.point1).to.not.equal(complex.point2);
      expect(complex.point1[0]).to.equal(complex.point2[0]);

      complex = wrapDefaults({
        defaultValue: {
          point: {
            lat: 23.324,
            long: 65.332,
          },
        },
        setUndefined: true,
      });

      expect(complex.route1).to.not.equal(complex.route2);
      expect(complex.route1.point).to.equal(complex.route2.point);
    });

    it('should deep clone nested arrays', () => {
      const complex: any = wrapDefaults({
        defaultValue: [[2.345, 43.53]],
        setUndefined: true,
        shallowCopy: false,
      });

      expect(complex.point1).to.not.equal(complex.point2);
      expect(complex.point1[0]).to.not.equal(complex.point2[0]);
    });

    it('should deep clone nested objects', () => {
      const complex: any = wrapDefaults({
        defaultValue: {
          point: {
            lat: 23.324,
            long: 65.332,
          },
        },
        setUndefined: true,
        shallowCopy: false,
      });

      expect(complex.route1).to.not.equal(complex.route2);
      expect(complex.route1.point).to.not.equal(complex.route2.point);
    });

    it('should deep clone nested objects with symbols', () => {
      const sym1 = Symbol('one');
      const sym2 = Symbol('two');
      const defaultValue = {
        [sym1]: [],
        [sym2]: [],
        point: {
          lat: 23.324,
          long: 65.332,
        },
      };

      const complex: any = wrapDefaults({
        defaultValue: defaultValue,
        setUndefined: true,
        shallowCopy: false,
      });

      expect(complex.any).to.not.equal(defaultValue);
      expect(complex.any[sym1]).to.not.equal(defaultValue[sym1]);
      expect(complex.any[sym2]).to.not.equal(defaultValue[sym2]);
      expect(complex.any.point).to.not.equal(defaultValue.point);
    });
  });

  describe('arrays', () => {
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
        wrap: [1, 2, 3, 4, 5],
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

  describe('unwrapDefaults', () => {
    it('should return the unwrapped object', () => {
      class Person {}

      const person = new Person();
      const defaults = wrapDefaults({ wrap: person });
      const unwrapped = defaults.unwrapDefaults();

      expect(person).to.not.equal(defaults);
      expect(unwrapped).to.equal(person);
    });

    it('should return the unwrapped array', () => {
      const a: any[] = [];
      const defaults = wrapDefaults({ wrap: a });
      const unwrapped = defaults.unwrapDefaults();

      expect(a).to.not.equal(defaults);
      expect(unwrapped).to.equal(a);
    });
  });
});
