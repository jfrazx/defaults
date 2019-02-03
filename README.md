# Defaults

Supply default values for JavaScript Objects using ES2015 Proxy.

---

## Install

`npm install @status/defaults`

or

`yarn add @status/defaults`

---

## Usage

You may invoke the Proxy yourself, passing `Defaults` as the handler.

```typescript
import { Defaults } from '@status/defaults';

const wrapped = new Proxy(myObject, new Defaults());
```

`Defaults` default is `undefined`, which makes it rather useless, so supplying your own default is a good idea.

Additionally, it accepts a function that can be used to determine if a default value should be used instead of the value being set. Returning `true`, or any truthy value, will result in your default value being set.

```typescript
import { Defaults } from '@status/defaults';

const wrapped = new Proxy(
  myObject,
  new Defaults({
    defaultValue: 0,
    setCriteria: (value, _property, _myObject) => value < 0,
  })
);

wrapped.belowZero = -35;

console.log(wrapped.belowZero);
// => 0
```

Be aware that while defaults are supplied for undefined values they are not set. This behavior can be modified.

```typescript
import { Defaults } from '@status/defaults';

const wrapped = new Proxy(
  {},
  new Defaults({
    defaultValue: 0,
    setUndefined: true,
  })
);

console.log(wrapped.notThere);
// => 0;
```

Using complex content as a default is possible, but only shallow copies are made.

```typescript
const complex = new Proxy(
  {},
  new Defaults({
    defaultValue: [[2.345, 43.53]],
    setUndefined: true,
  })
);

complex.point1 === complex.point2;
// => false

complex.point1[0] === complex.point2[0];
// => true
```

This can be changed by passing `shallowCopy` as `false`. ShallowCopy has no effect when using primitive values.

```typescript
const complex = new Proxy(
  {},
  new Defaults({
    defaultValue: [[2.345, 43.53]],
    setUndefined: true,
    shallowCopy: false,
  })
);

complex.point1 === complex.point2;
// => false

complex.point1[0] === complex.point2[0];
// => false
```

For convenience, Defaults has a static `wrap` method.

```typescript
import { Defaults } from '@status/defaults';

const wrapped = Defaults.wrap({
  wrap: myObject,
  defaultValue: 0,
  shallowCopy: false,
  setUndefined: true,
  setCriteria: v => v < 0,
});
```

---

## `Defaults` defaults

All options have default values.

- wrap: `{}`
- shallowCopy: `true`
- setUndefined: `false`
- defaultValue: `undefined`
- setCriteria: `() => false`

---

## Override

You may override your defined criteria should you _really_ need to set a value that would fail.

```typescript
const aboveZero = Defaults.wrap({
  defaultValue: 0,
  setCriteria: v => v < 0,
});

aboveZero.notAnymore = { ignoreDefaultCriteria: true, value: -345 };

console.log(aboveZero);
// => { notAnymore: -345 }
```

---

## Info

Determining if a property exists on an object is unaffected when using `Defaults`, even when using `setUndefined`.

```typescript
const wrapped = Defaults.wrap({ defaultValue: [], setUndefined: true });
const prop = 'prop';

console.log(prop in wrapped);
// => false
```

---

## Examples

```typescript
import { Defaults } from '@status/defaults';

const charCount = Defaults.wrap({
  defaultValue: 0,
  setCriteria: v => v < 0,
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
const myObj = Defaults.wrap({ defaultValue: [] });

myObj.ifNotExistsWillStillHaveArray.forEach(...);
```

---

## Caveats

In a Node environment, if you enabled `setUndefined` and `console.log(myWrappedObject)` you will have additional properties due to this [bug](https://github.com/nodejs/node/issues/10731).

```bash
inspect
[Symbol(nodejs.util.inspect.custom)]
[Symbol(Symbol.toStringTag)]
[Symbol(Symbol.iterator)]
```

As far as I'm aware this only happens when inspecting and is just something we'll have to ignore.

---
