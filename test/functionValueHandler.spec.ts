import type { Property } from '../src/interfaces';
import { wrapDefaults } from '../src';
import { expect } from 'chai';

describe('FunctionValueHandler', () => {
  it('should return the value of the passed function', () => {
    const wrapped = wrapDefaults<{ [key: string]: number }, number>({
      defaultValue: () => 5,
      execute: true,
    });

    expect(wrapped.something).to.be.a('number');
    expect(wrapped.anything).to.equal(5);
  });

  it('should return the value of the passed function', () => {
    interface ITest {
      key: string;
      val: number;
    }

    interface MTest {
      [key: string]: ITest;
    }

    const wrapped = wrapDefaults<MTest, ITest>({
      defaultValue: (key: Property) => ({ val: 5, key: key as string }),
      execute: true,
    });

    expect(wrapped.something).to.be.an('object');
    expect(wrapped.anything).to.deep.equal({ val: 5, key: 'anything' });
  });
});
