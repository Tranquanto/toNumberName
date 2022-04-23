class hugeNumber {
    constructor(num) {
        if (typeof num === "object") {
            this.exponent = num.exponent;
            this.mul = num.mul;
        } else {
            num = String(num);
            if (num.split("e")[1] !== undefined) {
                this.exponent = Number(num.split("e")[1]);
                this.mul = Number(num.split("e")[0]);
            } else {
                let decimalPlaces;
                let bd = num.split(".")[0];
                let ad = num.split(".")[1];
                if (ad === undefined) {
                    ad = "0";
                }
                decimalPlaces = ad.length;
                this.exponent = bd.length - 1;
                if (this.exponent > 0) {
                    this.mul = Number(bd.slice(0, 0 - this.exponent) + "." + bd.slice(1) + ad);
                } else {
                    this.mul = Number(num);
                }
            }
			if (Math.floor(this.exponent) !== this.exponent) {
				this.mul *= 10 ** (this.exponent - Math.floor(this.exponent));
				while (this.mul >= 10) {
					this.exponent++;
					this.mul /= 10;
				}
				this.exponent = Math.floor(this.exponent);
			}
        }
    }

    add(num, ab) {
        if (ab === undefined) {
            ab = false;
        }
        let difference;
        let difference2;
        num = new hugeNumber(num);
        if (ab) {
            num.exponent = new hugeNumber(num.exponent);
            this.exponent = new hugeNumber(this.exponent);
        }
        let opposite = function (a) {
            if (typeof a === "object") {
                return a.opposite();
            } else {
                return 0 - a;
            }
        }
        if (ab) {
            difference = num.exponent.add(opposite(this.exponent), false);
            difference2 = this.exponent.add(opposite(num.exponent), false);
        } else {
            difference = num.exponent + opposite(this.exponent);
            difference2 = this.exponent + opposite(num.exponent);
        }
        if (num.exponent === this.exponent) {
            num.mul += this.mul;
        } else if (num.exponent > this.exponent) {
            num.mul += this.mul / 10 ** Number(new hugeNumber(difference).print());
        } else {
            let b = num;
            num = this;
            num.mul += b.mul / 10 ** Number(new hugeNumber(difference2).print());
        }
        if (num.mul >= 10) {
            while (num.mul >= 10) {
                num.mul = num.mul / 10;
                if (typeof num.exponent !== "object") {
                    num.exponent++;
                } else {
                    num.exponent = num.exponent.add(1, false);
                }
            }
        }
        return num;
    }

    multiply(n) {
        n = new hugeNumber(n);
        n.exponent = this.log10().add(n.log10()).number();
        n.mul = 10 ** (n.exponent % 1);
        n.exponent = ~~n.exponent;
        return n;
    }

    opposite() {
        let n = this;
        n.mul = 0 - n.mul;
        return n;
    }

    print() {
        let n;
        if (this.exponent >= 10) {
            return this.mul.toFixed(2) + "e" + this.exponent;
        } else {
            n = Math.round(this.mul * 10 ** this.exponent * 100) / 100;
            return String(n);
        }
    }

    toString() {
        return this.print();
    }

    number() {
        return this.mul * 10 ** this.exponent;
    }

    log10() {
        return new hugeNumber(this.exponent + Math.log10(this.mul));
    }

    gt(n) {
        n = new hugeNumber(n);
        if (n.exponent === this.exponent) {
            return n.mul <= this.mul;
        } else {
            if (n.exponent > this.exponent) {
                while (n.exponent !== this.exponent) {
                    n.exponent--;
                    n.mul *= 10;
                }
            } else {
                while (n.exponent !== this.exponent) {
                    n.exponent++;
                    n.mul /= 10;
                }
            }
            return n.mul <= this.mul;
        }
    }

    gte(n) {
        n = new hugeNumber(n);
        if (n.exponent === this.exponent) {
            return n.mul < this.mul;
        } else {
            if (n.exponent > this.exponent) {
                while (n.exponent !== this.exponent) {
                    n.exponent--;
                    n.mul *= 10;
                }
            } else {
                while (n.exponent !== this.exponent) {
                    n.exponent++;
                    n.mul /= 10;
                }
            }
            return Math.round(n.mul * 100000) < Math.round(this.mul * 100000);
        }
    }

    gten(n) {
        const o = this.number();
        n = new hugeNumber(n);
        n = n.number();
        return o >= n;
    }
}