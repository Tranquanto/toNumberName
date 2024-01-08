# numberName
Converts a number to its name.

Use function numberName(number)

Replace "number" with an ExpantaNum, OmegaNum, break infinity/eternity/Decimal, or basic javascript number or string

Upper limit of 10^^3 -> 9 (10^10^10^9)

## Installation

```html
<script src="https://raw.githubusercontent.com/darngon/toNumberName/main/numberName.js"></script>
```

## How to use

There is a function called numberName() that is used to convert the number.

It has four parameters: `numberName(number, abbreviate, onlyExp, decimalPlaces)`

`number` is the number you want to convert. I want to make this work with as many libraries as possible; let me know if you find one that doesn't.

`abbreviate` is a simple `true`/`false` parameter (default to false). It controls whether you want the numbers to be abbreviated, like `2 billion` turns to `2 B`.

`onlyExp` is a simple `true`/`false` parameter (default to false). It controls whether only the exponent is changed, or the mantissa and the exponent. For example, `true` would yield something like "3 million" and `false` would give "three million". Always `true` if `abbreviate` is `true`.

`decimalPlaces` is a parameter to print how many digits are after the decimal point, for example it would write it as `2.38` (2) or `2.3815` (4).

Example for how to use:

```js
let number = 2.8e108;

numberName(number, false, true, 3);
"2.800 quintrigintillion"

numberName(number, true, true, 1);
"2.8 QiTg"

number = "1.63e54321";
numberName(number, false, true, 2);
"1.63 septendecimillisexcentillion"

number = "768328947378913428973142678342169734196743916743671483291673428"
numberName(number, false, false);
"seven hundred sixty-eight novemdecillion three hundred twenty-eight octodecillion nine hundred forty-seven septendecillion three hundred eighty sexdecillion"

number = "1.481924"
numberName(number);
"one point four eight one nine two four"
```

## What are these other scripts?

`numberName.js` is the main script. It contains the function `numberName()` and is a complete rewrite of `toNumberName.js`.

`toNumberName.js` is a complete rewrite of `old_toNumberName.js`. It contains the function `toNumberName()` with an upper limit of 10^(3×10^6+3). It is kept for backwards compatibility, but it is recommended to use `numberName.js` instead due to optimizations and other improvements.

`old_toNumberName.js` is the oldest version of `toNumberName.js`. It also contains the function `toNumberName()`. It is highly recommended to use `numberName.js` instead.
