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
});
