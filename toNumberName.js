function toNumberName(number, abbreviate, decimalPlaces, dontChange, dontChange1) {
    const arrays = [
        ["", "un", "duo", "tre", "quattuor", "quin", "sex", "septen", "octo", "novem"],
        ["", "mi", "bi", "tri", "quadri", "quinti", "sexti", "septi", "octi", "noni"],
        ["", "deci", "viginti", "triginti", "quadraginti", "quinquaginti", "sexaginti", "septuaginti", "octoginti", "nonaginti"],
        ["", "centi", "ducenti", "trucenti", "quadringenti", "quingenti", "sescenti", "septingenti", "octingenti", "nongenti"],
        ["", "milli-", "micro-", "nano-", "pico-", "femto-", "atto-", "zepto-", "yocto-", "xenno-", "weko-", "vendeko-"],
        ["", "milli", "micri", "nani", "pici", "femti", "atti", "zepti", "yocti", "xenni", "weki", "vendeki"],
        ["", "U", "D", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"],
        ["", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"],
        ["", "Dc", "Vg", "Tg", "Qag", "Qig", "Sxg", "Spg", "Ocg", "Nog"],
        ["", "Ct", "Dct", "Tct", "Qagt", "Qigt", "Ssct", "Spgt", "Ocgt", "Nogt"],
        ["", "MI-", "μ-", "N-", "P-", "F-", "A-", "Z-", "Y-", "X-", "W-", "V-"],
        ["", "MI", "μ", "N", "P", "F", "A", "Z", "Y", "X", "W", "V"]
    ];
    number = number.toString();
    if (decimalPlaces === undefined) {
        decimalPlaces = 3;
    }
    if (abbreviate) {
        abbreviate = 6;
    } else {
        abbreviate = 0;
    }
    let output = ["", "", "", ""];
    let exponent;
    let mantissa;
    if (number.match("e") !== null) {
        exponent = Number(number.split("e")[1]);
        if (decimalPlaces !== -1) {
            mantissa = (Number(number.split("e")[0]) * 10 ** (exponent % 3)).toFixed(decimalPlaces);
        } else {
            mantissa = (Number(number.split("e")[0]) * 10 ** (exponent % 3))
        }
    } else {
        exponent = number.split(".")[0].length - 1;
        if (decimalPlaces !== -1) {
            mantissa = (Number(number.slice(0, 21)) / 10 ** (number.split(".")[0].slice(0, 21).length - exponent % 3 - 1)).toFixed(decimalPlaces);
        } else {
            mantissa = (Number(number.slice(0, 21)) / 10 ** (number.split(".")[0].slice(0, 21).length - exponent % 3 - 1));
        }
    }
    output[0] = ((exponent >= 3003) ? toNumberName(`1e${exponent / 10 ** ~~((~~(Math.log10(exponent / 3 - 1) / 3)) * 3)}`, abbreviate, decimalPlaces, exponent >= 3003, true) : "") + ((exponent % 3000 >= 3 && exponent % 3000 < 6) ? "" : arrays[4 + abbreviate][~~(Math.log10(exponent / 3 - 1) / 3)]);
    if (exponent % 3000 >= 3 && exponent % 3000 < 6) {
        output[1] = arrays[5 + abbreviate][~~(Math.log10(exponent / 3 - 1) / 3)];
    }
    if ((exponent - 3) % 3000 < 33 && !dontChange1) {
        output[2] = arrays[1 + abbreviate][~~((exponent - 3) % 30 / 3)];
        if (exponent >= 3 && exponent < 6) {
            output[2] = abbreviate ? "K" : "thousand";
        }
    } else {
        output[2] = arrays[abbreviate][~~((exponent - 3) % 30 / 3)];
    }
    output[3] = arrays[2 + abbreviate][~~((exponent - 3) % 300 / 30)];
    output[4] = arrays[3 + abbreviate][~~((exponent - 3) % 3000 / 300)];
    if (dontChange) {
        mantissa = "";
    } else {
        mantissa += " ";
    }
    if (exponent > 3000003) {
        return number;
    } else {
        return `${mantissa}${output.join("")}${(abbreviate || exponent < 6 || dontChange) ? "" : "llion"}`.replaceAll("undefined", "");
    }
}