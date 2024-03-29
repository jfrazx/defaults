# Defaults

![npm (scoped)](https://img.shields.io/npm/v/@status/defaults.svg?style=plastic)
![GitHub](https://img.shields.io/github/license/jfrazx/defaults.svg?style=plastic)
![GitHub Workflow Status (with branch)](https://img.shields.io/github/actions/workflow/status/jfrazx/defaults/tests.yml?label=tests&style=plastic)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@status/defaults?style=plastic)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@status/defaults?style=plastic)

Transparently supply default values for JavaScript Objects.

---

## Install

`npm install @status/defaults`

or

`yarn add @status/defaults`

---

## Usage

`Defaults` exposes a function, `wrapDefaults`, that receives your object and any options;

```typescript
import { wrapDefaults } from '@status/defaults';

const wrapped = wrapDefaults({
  wrap: myObject,
  /** options explained below */
});
```

`Defaults` default is `undefined`, which makes it rather useless, so supplying your own default is a good idea.

Additionally, it accepts a function, `setCriteria`, that can be used to determine if a default value should be used instead of the value being set. Returning `true`, or any truthy value, will result in your default value being set.

```typescript
import { wrapDefaults } from '@status/defaults';

const wrapped = wrapDefaults({
  wrap: myObject,
  defaultValue: 0,
  setCriteria: (value: number, _property: string, _myObject: T) => value < 0,
});

wrapped.belowZero = -35;

expect(wrapped.belowZero).to.equal(0);
```

Be aware that while defaults are supplied for undefined values they are not set. This behavior may be modified.

```typescript
import { wrapDefaults } from '@status/defaults';

const wrapped = wrapDefaults({
  defaultValue: 0,
  setUndefined: true,
});

expect(wrapped.notThere).to.equal(0);
```

Using complex content as a default is possible, but only shallow copies are made.

```typescript
const complex = wrapDefaults({
  defaultValue: [[2.345, 43.53]],
  setUndefined: true,
});

expect(complex.point1).to.not.equal(complex.point2);
expect(complex.point1[0]).to.equal(complex.point2[0]);
```

This can be changed by passing `shallowCopy` as `false`. ShallowCopy has no effect when using primitive values.

```typescript
const complex = wrapDefaults({
  defaultValue: [[2.345, 43.53]],
  setUndefined: true,
  shallowCopy: false,
});

expect(complex.point1).to.not.equal(complex.point2);
expect(complex.point1[0]).to.not.equal(complex.point2[0]);
```

You can also use a function as a default value. If `execute` is `true` the function will be executed and the result returned.

```typescript
const wrapped = wrapDefaults({
  defaultValue: () => 2 + 2,
  setUndefined: true,
  execute: true,
});

expect(wrapped.four).to.equal(4);
```

The function will receive the property being accessed as its first argument.

```typescript
const wrapped = wrapDefaults({
  defaultValue: (prop) => prop,
  setUndefined: true,
  execute: true,
});

expect(wrapped.four).to.equal('four');
```

If you want to use a function as a default value but not execute it, set `execute` to `false`.

```typescript
const wrapped = wrapDefaults({
  defaultValue: () => 2 + 2,
  setUndefined: true,
  execute: false,
});

expect(wrapped.four).to.be.a('function');
```

Using `wrapDefaults` helper will add a type for `unwrapDefaults` method which, when invoked, returns the original unwrapped object.

```typescript
import { wrapDefaults } from '@status/defaults';

class Person {}

const person = new Person();
const defaults = wrapDefaults({ wrap: person });
const unwrapped = defaults.unwrapDefaults();

expect(person).to.not.equal(defaults);
expect(person).to.equal(unwrapped);
```

Defaults can also wrap arrays.

```typescript
import { wrapDefaults } from '@status/defaults';

const array = wrapDefaults({
  wrap: [] as number[],
  defaultValue: 7,
  setCriteria: (v) => v < 7,
  setUndefined: true,
});

expect(array[0]).to.equal(7);

array.push(1);

expect(array[1]).to.equal(7);
```

---

## `Defaults` defaults

All options have default values.

|    Option    | Default Value | Description                                                                                                            |
| :----------: | :-----------: | ---------------------------------------------------------------------------------------------------------------------- |
|     wrap     |      {}       | The object to wrap                                                                                                     |
| shallowCopy  |     true      | Only create shallow copies of `defaultValue` objects                                                                   |
| setUndefined |     false     | Set undefined values with `defaultValue`                                                                               |
| defaultValue |   undefined   | The value to return if resolved value is undefined                                                                     |
| setCriteria  |  () => false  | Function that can override value to be set with the `defaultValue`                                                     |
|   execute    |     false     | If true and `defaultValue` is a function it will be executed and the result returned. Receives property being accessed |
|    noCopy    |     false     | Indicates if non-primitive default values should be returned as-is                                                     |
| reuseMapKey  |     true      | If true and default value is a Map the key will be reused, otherwise shallowCopy rules apply                           |
| runAfterSet  |   () => {}    | Function to run after a default value is set. `setUndefined` must be true                                              |

---

## Override

You may override your defined criteria should you _really_ need to set a value that would fail.

```typescript
const aboveZero = wrapDefaults({
  defaultValue: 0,
  setCriteria: (v) => v < 0,
});

aboveZero.notAnymore = { ignoreDefaultCriteria: true, value: -345 };

console.log(aboveZero);
// => { notAnymore: -345 }
```

---

## Info

Determining if a property exists on an object is unaffected when using `Defaults`, even when using `setUndefined`.

```typescript
const wrapped = wrapDefaults({ defaultValue: [], setUndefined: true });
const prop = 'prop';

expect(prop in wrapped).to.be.false;
```

---

## Examples

```typescript
import { wrapDefaults } from '@status/defaults';

const charCount = wrapDefaults({
  setCriteria: (v) => v < 0,
  setUndefined: true,
  defaultValue: 0,
});

const sentence = 'something wicked this way comes';

// do this (using Defaults)
for (const char of sentence) {
  charCount[char]++;
}

// instead of this (without Defaults)
for (const char of sentence) {
  if (!(char in charCount)) {
    charCount[char] = 0;
  }

  charCount[char]++;
}
```

Ever done something like this?

```typescript
const myObj = { prop1: [] };


(myObj.propMaybeExists || []).forEach(...);
```

Use defaults instead.

```typescript
const myObj = wrapDefaults({ defaultValue: [] });

myObj.ifNotExistsWillStillHaveArray.forEach(...);
```

---
