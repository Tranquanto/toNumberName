# toNumberName
Converts a number to the "illions" name.

Use function toNumberName(number)

Replace "number" with an ExpantaNum, OmegaNum, break infinity/eternity/Decimal, or basic javascript number or string

Goes up to 10^3000003 (Micrillion)

# How to use

There is a function called toNumberName() that is used to convert the number.

It has three parameters: `toNumberName(number, abbreviate, decimalPlaces)`

`number` is the number you want to convert

`abbreviate` is a simple true/false parameter. It controls whether you want the numbers to be abbreviated, like 2 billion turns to 2 B.

`decimalPlaces` is a parameter to print how many digits are after the decimal point, for example it would write it as 2.38 (2) or 2.3815 (4). You can set this to -1 to not have a fixed decimal count.

Example for how to use:

```js
let number = 2.8e108;

toNumberName(number);
"2.800 quintrigintillion"

toNumberName(number, true, 1);
"2.8 QiTg"

number = "1.63e54321";
toNumberName(number, false, -1);
"1.63 septendecimilli-sexcentillion"

number = "768328947378913428973142678342169734196743916743671483291673428"
toNumberName(number, true, -1);
"768.3289473789134 NoDc"
```
