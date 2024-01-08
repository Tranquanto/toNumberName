/**
 * Writes any real number in word form (up to about 10^10^10^9)
 * @param {number | string | BigInt | boolean} n The number to convert
 * @param {boolean} [abbreviate] Whether to abbreviate the output
 * @param {boolean} [onlyExp] Whether to only apply number names to the exponent to get a result like 175 billion instead of one hundred seventy-five billion. Always true if abbreviate is true
 * @param {number} [decimalPlaces] The number of decimal places to round to
 * @returns {string} The name of the number
 */
function numberName(n, abbreviate, onlyExp, decimalPlaces) { // i made something like this a while back, then remade it from stratch, and this is the third iteration and it is so much more optimized like idk what on earth i was doing before
    // this actually goes all the way up to 10^10^10^9 which i am pretty proud of
    // that number is so unfathomably large
    // googolplex is 10^10^10^2
    let mantissa, exponent, sign = "", q = 0;
    if (abbreviate) q = 5;
    if (n === Infinity) return "Infinity";
    if (n === undefined || n === "") return "";

    // parse the input
    if (typeof n === "boolean") {
        mantissa = n ? 1 : 0;
        exponent = 0;
    } else if (typeof n === "number") {
        mantissa = 10 ** (Math.log10(n) % 1);
        exponent = Math.floor(Math.log10(n));
        if (n < 0) sign = "-";
    } else if (typeof n === "bigint") {
        exponent = n.toString().length - 1;
        mantissa = Number(n.toString()[0] + "." + n.toString().slice(1));
        if (n < 0n) sign = "-";
    } else if (typeof n === "string") {
        n = n.replaceAll(",", "").replaceAll("_", "").replaceAll(" ", "");
        if (n[0] === "-") {
            sign = "-";
            n = n.slice(1);
        }
        if (n.includes("e")) {
            const s = n.indexOf("e");
            mantissa = n.slice(0, s) === "" ? 1 : Number(n.slice(0, s));
            if (n.slice(s + 1).includes("e")) {
                const e2 = n.slice(s + 1).split("e");
                exponent = BigInt(e2[0] === "" ? "1" : e2[0]) * 10n ** BigInt(e2[1]);
            } else {
                exponent = BigInt(n.slice(s + 1));
            }
        } else {
            const decimal = n.indexOf(".");
            mantissa = Number(n[0] + "." + n.slice(1).replace(".", ""));
            exponent = decimal === -1 ? n.length - 1 : decimal - 1;
        }
    } else if (typeof n === "object" && n.toString) {
        return numberName(n.toString(), abbreviate, onlyExp, decimalPlaces);
    } else {
        throw new TypeError("Invalid number input");
    }

    exponent = BigInt(exponent);
    mantissa *= Number(10n ** (exponent % 3n));
    exponent = BigInt(exponent) - BigInt(exponent) % 3n; // round to the nearest multiple of 3 and convert to BigInt
    mantissa = Math.round(mantissa * 1e8) / 1e8; // round to 8 decimal places to fix floating point errors
    let mn = mantissa % 1;
    mantissa = Math.floor(mantissa);

    // the names used to build the output
    const names = [
        // full name arrays
        ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"],
        ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"],
        ["", "m", "b", "tr", "quadr", "quint", "sext", "sept", "oct", "non"],
        ["", "un", "duo", "tre", "quattuor", "quin", "sex", "septen", "octo", "novem"],
        ["", "dec", "vigint", "trigint", "quadragint", "quinquagint", "sexagint", "septuagint", "octogint", "nonagint"],
        ["", "cent", "ducent", "trescent", "quadringent", "quingent", "sescent", "septingent", "octingent", "nongent"],
        ["", "mill", "micr", "nan", "pic", "femt", "att", "zept", "yoct", "xon"],

        // abbreviated arrays
        ["", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"],
        ["", "U", "D", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"],
        ["", "Dc", "Vg", "Tg", "Qag", "Qig", "Sxg", "Spg", "Ocg", "Nog"],
        ["", "Ct", "Dct", "Tct", "Qagt", "Qigt", "Sxgt", "Spgt", "Ocgt", "Nogt"],
        ["", "Mi", "Mc", "Na", "Pc", "Fm", "At", "Zp", "Yc", "Xn"]
    ];
    let name = "";

    // add the mantissa
    if (!onlyExp && !abbreviate) {
        function a(m) {
            if (m >= 20) {
                return names[1][Math.floor(m / 10)] + (m % 10 === 0 ? "" : "-" + names[0][m % 10]);
            } else {
                return names[0][m];
            }
        }
        if (mantissa >= 100) {
            name += a(Math.floor(mantissa / 100)) + " hundred ";
        }
        if (mantissa % 100 !== 0) {
            name += a(mantissa % 100);
        }
        name += " ";
    } else {
        const c = String(mantissa + mn).split(".");
        name += c[0] + (c[1] ? "." + c[1].slice(0, Math.min(decimalPlaces || 2, c[1].length)) : "");
        if (c[1] && c[1].length < decimalPlaces) {
            name += "0".repeat(decimalPlaces - c[1].length);
        }
        name += " ";
    }

    // add the name of the exponent
    if (exponent === 3n) {
        if (abbreviate) {
            name += "K";
        } else {
            name += "thousand";
        }
        name += " ";
    } else if (exponent !== 0n) {
        if (exponent < 33n) {
            name += names[2 + q][exponent / 3n - 1n] + (!abbreviate ? "illion " : " ");
        } else {
            if (exponent >= 3003n) {
                name += numberName(`1e${(exponent - 3n) / 1000n + 3n}`, abbreviate, onlyExp)
                    .replace("one hundred ", "")
                    .replace("ten ", "")
                    .replace("one ", "")
                    .replace("100 ", "")
                    .replace("10 ", "")
                    .replace("1 ", "")
                    .replace("illion", "illi")
                    .replace("thousand", "milli")
                    .replace("K", "M") + (abbreviate ? "-" : "");
                name += numberName(`1e${(exponent - 3n) % 3000n + 3n}`, abbreviate, onlyExp)
                    .replace("thousand", !abbreviate ? "nillion" : "")
                    .replace("one ", "")
                    .replace("1 ", "")
                    .replace("K", "N");
            } else {
                const g = names[4 + q][(exponent - 3n) / 30n % 10n];
                name += (names[3 + q][(exponent / 3n - 1n) % 10n] + g + (g ? "i+" : "") + names[5 + q][((exponent - 3n) / 300n) % 10n] + "illion ").replace("i+illion", "illion");
                name = name.replace(" i+", " ");
                if (abbreviate) name = name.replace("i+", "").replace("illion", "");
                else name = name.replace("i+", "i");
            }
        }
    }
    if (exponent === -Infinity || mantissa === 0) name = "zero";

    // remove trailing spaces
    let name2 = name.replaceAll("  ", " ").replaceAll("undefined", "") + " " + (exponent >= 3n && mn !== 0 && !abbreviate && !onlyExp ? numberName(`${mn * 1e3}e${exponent - 3n}`).replace("zero", "") : "");
    while (name2.endsWith(" ")) {
        name2 = name2.slice(0, -1);
    }

    // add decimals if applicable
    if (mn > 0 && exponent < 3n && !onlyExp) name2 += " point";
    while (mn > 0 && exponent < 3n && !onlyExp) {
        mn *= 10;
        mn = Math.round(mn * 1e8) / 1e8;
        name2 += " " + names[0][Math.floor(mn)];
        mn %= 1;
    }

    // add sign and return number name
    return (sign === "-" ? "negative " : "") + name2.replaceAll("  ", " ").replaceAll("undefined", "");
}