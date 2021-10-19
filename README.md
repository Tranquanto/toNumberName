# toNumberName
Converts a number to the "illions" name.

Use function toNumberName(number)

Replace "number" with an ExpantaNum number, break infinity/eternity/decimal number, or basic javascript number

Goes up to 10^33000

# How to use

There is a function called toNumberName() that is used to convert the number.

It has three parameters: `toNumberName(number, type, abbreviate)`

`number` is the number you want to convert

`type` is the type of number (used for compatibility with other libraries such as break_infinity.js

`abbreviate` is a simple true/false parameter. It controls whether you want the numbers to be abbreviated, like 2 billion turns to 2 B.

Example for how to use:

```js

let number = 2.8e108;
> toNumberName(number);
< "2.800 quintrigintillion"

> toNumberName(number, "default", true);
< "2.8 QiTg"
```
