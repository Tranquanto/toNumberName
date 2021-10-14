var numberNames = [
    ["","milli","billi","trilli","quadrilli","quintilli","sextilli","septilli","octilli","nonilli","decilli"],
    ["novem","","un","duo","tre","quattuor","quin","sex","septen","octo"],
    ["","decillion","vigintillion","trigintillion","quadragintillion","quinquagintillion","sexagintillion","septuagintillion","octogintillion","nonagintillion"],
    ["","centillion","ducentillion","trucentillion","quadringentillion","quingentillion","sescentillion","septingentillion","octingentillion","nongentillion"],
    ["","deci","viginti","triginta","quadraginta","quinquaginta","sexaginta","septuaginta","octoginta","nonaginta"],
    ["K","million","billion","trillion","quadrillion","quintillion","sextillion","septillion","octillion","nonillion"]
];
function toNumberName(number) {
	var numberName = ["","","",""];
    numberName[0] = numberNames[0][((number.abs().log10().sub(3)).div(3000)).floor().toNumber()];
	if (number.abs().log10().mod(3000).greaterThanOrEqualTo(33)) {
		numberName[1] = numberNames[1][((number.abs().log10().div(3)).floor()).mod(10).toNumber()];
	} else {
		if (number.abs().log10().greaterThanOrEqualTo(3003)) {
            numberName[1] = numberNames[5][((number.abs().log10().div(3)).floor()).mod(10).toNumber()];
		} else {
			numberName[1] = numberNames[5][((number.abs().log10().div(3)).floor().sub(1)).mod(10).toNumber()];
		}
	}
	if (number.abs().log10().mod(3000).greaterThanOrEqualTo(303)) {
		numberName[2] = numberNames[4][(((number.abs().log10().sub(3)).div(30)).floor()).mod(10).toNumber()];
	} else {
		numberName[2] = numberNames[2][(((number.abs().log10().sub(3)).div(30)).floor()).mod(10).toNumber()];
	}
	numberName[3] = numberNames[3][(((number.abs().log10().sub(3)).div(300)).floor()).mod(10).toNumber()];
	numberName[0] = numberNames[0][((number.abs().log10().sub(3)).div(3000)).floor().toNumber()];
	if (number.abs().log10().mod(3000).greaterThanOrEqualTo(33)) {
		numberName[1] = numberNames[1][((number.abs().log10().div(3)).floor()).mod(10).toNumber()];
	} else {
		if (number.abs().log10().greaterThanOrEqualTo(3003)) {
			numberName[1] = numberNames[5][((number.abs().log10().div(3)).floor()).mod(10).toNumber()];
		} else {
			numberName[1] = numberNames[5][((number.abs().log10().div(3)).floor().sub(1)).mod(10).toNumber()];
		}
	}
	if (number.abs().log10().mod(3000).greaterThanOrEqualTo(303)) {
		numberName[2] = numberNames[4][(((number.abs().log10().sub(3)).div(30)).floor()).mod(10).toNumber()];
	} else {
		numberName[2] = numberNames[2][(((number.abs().log10().sub(3)).div(30)).floor()).mod(10).toNumber()];
	}
	numberName[3] = numberNames[3][(((number.abs().log10().sub(3)).div(300)).floor()).mod(10).toNumber()];
    if (number.greaterThanOrEqualTo("1e33003")) {
        return number.toExponential(3);
    } else if (number.abs().log10().floor().greaterThanOrEqualTo(3003) && (number.abs().log10().floor().sub(3)).mod(3000).greaterThanOrEqualTo(0) && (number.abs().log10().floor().sub(3)).mod(3000).lessThanOrEqualTo(2)) {
        return ExpantaNum(10).pow((number.abs().log10()).sub(number.abs().log10().floor())).mul(ExpantaNum(10).pow(number.abs().log10().floor().mod(3))).mul(number.div(number.abs())).toFixed(3) + " " + numberName[0] + "llion";
    } else if (number.abs().log10().floor().greaterThanOrEqualTo(3)) {
        return ExpantaNum(10).pow((number.abs().log10()).sub(number.abs().log10().floor())).mul(ExpantaNum(10).pow(number.abs().log10().floor().mod(3))).mul(number.div(number.abs())).toFixed(3) + " " + numberName[0] + numberName[1] + numberName[2] + numberName[3];
    } else if (number.greaterThanOrEqualTo(1)) {
        return ExpantaNum(10).pow((number.abs().log10()).sub(number.abs().log10().floor())).mul(ExpantaNum(10).pow(number.abs().log10().floor().mod(3))).mul(number.div(number.abs())).toFixed(3);
    } else {
        return number.toString();
    }
}