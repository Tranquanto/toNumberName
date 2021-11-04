function toNumberName(number, type, abbreviate, decimalPlaces) {
    let numberNames;
    if (decimalPlaces === undefined) {
        decimalPlaces = 3;
    } else if (decimalPlaces > 14) {
        console.warn("decimalPlaces has a max value of 14");
    }
    if (abbreviate) {
        numberNames = [
            ["","M","B","T","Qa","Qi","Sx","Sp","Oc","No","Dc"],
            ["N","","U","D","T","Qa","Qi","Sx","Sp","Oc"],
            ["","Dc","Vg","Tg","Qag","Qig","Sxg","Spg","Ocg","Nog"],
            ["","Ct","Dct","Tct","Qagt","Qigt","Sxct","Spgt","Ocgt","Nogt"],
            ["", "Dc", "Vg", "Tg", "Qag", "Qig", "Sxg", "Spg", "Ocg", "Nog"],
            ["K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"]
        ];
    } else {
        numberNames = [
            ["","milli","billi","trilli","quadrilli","quintilli","sextilli","septilli","octilli","nonilli","decilli"],
            ["novem","","un","duo","tre","quattuor","quin","sex","septen","octo"],
            ["","decillion","vigintillion","trigintillion","quadragintillion","quinquagintillion","sexagintillion","septuagintillion","octogintillion","nonagintillion"],
            ["","centillion","ducentillion","trucentillion","quadringentillion","quingentillion","sescentillion","septingentillion","octingentillion","nongentillion"],
            ["", "deci", "viginti", "triginta", "quadraginta", "quinquaginta", "sexaginta", "septuaginta", "octoginta", "nonaginta"],
            ["K","million","billion","trillion","quadrillion","quintillion","sextillion","septillion","octillion","nonillion"]
        ];
    }
    let numberName = ["","","",""];
    let num;
    if (type === "expantanum") {
        num = ExpantaNum(10);
    } else if (type === "decimal") {
        num = new Decimal(10);
    } else if (type === undefined || type === "default") {
        type = "default";
    } else {
        console.error('Type can only be "expantanum", "decimal", or "default" (with quotes, leave blank for default)');
    }
    let exponent = Math.floor(Math.log10(Math.abs(number)) / 3);
    if (type === "decimal" || type === "expantanum") {
        let illion = number.abs().log10().sub(3);
        numberName[0] = numberNames[0][(illion.div(3000)).floor().toNumber()];
        if (number.abs().log10().toNumber()%3000 >= 33) {
            numberName[1] = numberNames[1][((number.abs().log10().div(3)).floor()).toNumber()%10];
        } else {
            if (number.abs().log10().greaterThanOrEqualTo(3003)) {
                numberName[1] = numberNames[5][((number.abs().log10().div(3)).floor()).toNumber()%10];
            } else {
                numberName[1] = numberNames[5][((number.abs().log10().div(3)).floor().sub(1)).toNumber()%10];
            }
        }
        let illionSegment = ((illion.div(30)).floor()).toNumber()%10;
        if (number.abs().log10().toNumber()%3000 >= 303) {
            numberName[2] = numberNames[4][illionSegment];
        } else {
            numberName[2] = numberNames[2][illionSegment];
        }
        numberName[3] = numberNames[3][((illion.div(300)).floor()).toNumber()%10];
        numberName[0] = numberNames[0][(illion.div(3000)).floor().toNumber()];
        if (number.abs().log10().toNumber()%3000 >= 33) {
            numberName[1] = numberNames[1][((number.abs().log10().div(3)).floor()).toNumber()%10];
        } else {
            if (number.abs().log10().greaterThanOrEqualTo(3003)) {
                numberName[1] = numberNames[5][((number.abs().log10().div(3)).floor()).toNumber()%10];
            } else {
                numberName[1] = numberNames[5][((number.abs().log10().div(3)).floor().sub(1)).toNumber()%10];
            }
        }
        if (number.abs().log10().toNumber()%3000 >= 303) {
            numberName[2] = numberNames[4][illionSegment];
        } else {
            numberName[2] = numberNames[2][illionSegment];
        }
        numberName[3] = numberNames[3][((illion.div(300)).floor()).toNumber()%10];
        if (number.log10().toNumber() >= 33000) {
            return number.toExponential(3);
        } else if (number.abs().log10().floor().toNumber() >= 3003 && (number.abs().log10().floor().sub(3)).toNumber()%3000 >= 0 && (number.abs().log10().floor().sub(3)).toNumber()%3000 <= 2) {
            return first() + " " + numberName[0] + "llion";
        } else if (number.abs().log10().floor().greaterThanOrEqualTo(3)) {
            return first() + " " + numberName[0] + numberName[1] + numberName[2] + numberName[3];
        } else if (number.greaterThanOrEqualTo(1)) {
            return first();
        } else {
            return number.toString();
        }
    } else if (type === "default") { // Plain Javascript
        numberName[0] = numberNames[0][Math.floor((Math.log10(Math.abs(number)) - 3) / 3000)];
        if (Math.log10(Math.abs(number))%3000 >= 33) {
            numberName[1] = numberNames[1][exponent%10];
        } else {
            if (Math.log10(Math.abs(number)) >= 3003) {
                numberName[1] = numberNames[5][exponent%10];
            } else {
                numberName[1] = numberNames[5][(exponent - 1)%10];
            }
        }
        if (Math.log10(Math.abs(number))%3000 >= 303) {
            numberName[2] = numberNames[4][(Math.floor((Math.log10(Math.abs(number)) - 3) / 30))%10];
        } else {
            numberName[2] = numberNames[2][(Math.floor((Math.log10(Math.abs(number)) - 3) / 30))%10];
        }
        numberName[3] = numberNames[3][(Math.floor((Math.log10(Math.abs(number)) - 3) / 300))%10];
        numberName[0] = numberNames[0][Math.floor((Math.log10(Math.abs(number)) - 3) / 3000)];
        if (Math.log10(Math.abs(number))%3000 >= 33) {
            numberName[1] = numberNames[1][exponent%10];
        } else {
            if (Math.log10(Math.abs(number)) >= 3003) {
                numberName[1] = numberNames[5][exponent%10];
            } else {
                numberName[1] = numberNames[5][(exponent - 1)%10];
            }
        }
        if (Math.log10(Math.abs(number))%3000 >= 303) {
            numberName[2] = numberNames[4][(Math.floor((Math.log10(Math.abs(number)) - 3) / 30))%10];
        } else {
            numberName[2] = numberNames[2][(Math.floor((Math.log10(Math.abs(number)) - 3) / 30))%10];
        }
        numberName[3] = numberNames[3][(Math.floor((Math.log10(Math.abs(number)) - 3) / 300))%10];

        let mainOutput = (Math.round((10**((Math.log10(Math.abs(number))) - (Math.floor(Math.log10(Math.abs(number))))) * (10**(Math.floor(Math.log10(Math.abs(number)))%3)) * (number / (Math.abs(number)))) * (10**decimalPlaces)) / (10**decimalPlaces)).toFixed(decimalPlaces);

        if (Math.log10(number) >= 33000) {
            return "Infinity";
        } else if (Math.floor(Math.log10(Math.abs(number))) >= 3003 && (Math.floor(Math.log10(Math.abs(number))) - 3)%3000 >= 0 && (Math.floor(Math.log10(Math.abs(number))) - 3)%3000 <= 2) {
            if (abbreviate) {
                return mainOutput + " " + numberName[0] + "L";
            } else {
                return mainOutput + " " + numberName[0] + "llion";
            }
        } else if (Math.floor(Math.log10(Math.abs(number))) >= 3) {
            return mainOutput + " " + numberName[0] + numberName[1] + numberName[2] + numberName[3];
        } else if (number >= 1) {
            return mainOutput;
        } else {
            return number;
        }
    }

    function first() {
        return num.pow((number.abs().log10()).sub(number.abs().log10().floor())).mul(num.pow(number.abs().log10().floor().toNumber() % 3)).mul(number.div(number.abs())).mul(10**decimalPlaces).floor().div(10**decimalPlaces).toFixed(decimalPlaces);
    }
}