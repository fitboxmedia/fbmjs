class Validator{
    constructor(form) {
        this.formTypes = false;
        this.regularExpression = {
            "initial"   : /^[A-zÀ-ÿA-åА-я.\-']{3,32}$/,
            "email"     : /^([a-z0-9!#$%&'*+\-/=?^_`{|}~][.]{0,1}){1,63}[a-z0-9!#$%&'*+\-/=?^_`{|}~]@[a-z0-9][a-z0-9.\-]{1,63}[a-z0-9]\.[a-z]{2,4}$/i,
            "phone"     : /^[\+0-9]{8,15}$/,
            "address"   : /^[A-zÀ-ÿA-åА-я0-9#.,;:"'°/\-\s]{3,127}[0-9A-zÀ-ÿA-åА-я#.,;:"'°]$/,
            "city"      : /^[A-zÀ-ÿA-åА-я]([A-zÀ-ÿA-åА-я/\-\)\(.\"\'\s]){1,126}[A-zÀ-ÿA-åА-я]$/,
            "cvv"       : /^[0-9]{3,4}$/,
            "postalCode": {
                "US"    : /^\d{5}$|^\d{5}-\d{4}$/,
                "CA"    : /^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/,
                "FR"    : /^[0-9]{5}$/,
                "AU"    : /^[0-9]{4}$/
            }
        };
        let types = [
            "initial",
            "email",
            "phone",
            "address",
            "city",
            "field",
            "postalCode",
            "cvv",
            "card",
            "date"
        ];

        for (let elem in form) {
            let errors = true;

            for (let i = 0; i < types.length; i++) {
                if (types[i] === form[elem].type) {
                    errors = false;
                    break;
                }
            }

            if (!errors) {
                this.formTypes = true;
            } else {
                this.formTypes = false;
                break;
            }
        }
    }

    validate(type, value1, value2) {

        value1 = value1.trim();

        if (typeof value2 !== "undefined") {
            value2 = value2.trim();
            return this[type](value1, value2);
        }

        try {
            return this.regularExpression[type].test(value1);
        } catch (AnotherFunction) {
            return this[type](value1);
        }
    }

    field(value) {
        if (value.trim().length === 0) {
            return false;
        }
        return true;
    }

    postalCode(value, countryCode) {
        if (["US", "CA", "FR", "AU"].indexOf(countryCode) >= 0) {
            return this.regularExpression["postalCode"][countryCode].test(value);
        } else {
            return true;
        }
    }

    card(value) {
        if (value.trim().length < 16) {
            return false;
        }
        let arr = [],
            card_number = value.toString();

        if (card_number.length < 16) {
            return false;
        }

        if (!isFinite(parseInt(+card_number))) {
            return false;
        }

        for (let i = 0; i < card_number.length; i++) {
            if (i % 2 === 0) {
                let m = parseInt(card_number[i]) * 2;
                if (m > 9) {
                    arr.push(m - 9);
                } else {
                    arr.push(m);
                }
            } else {
                let n = parseInt(card_number[i]);
                arr.push(n);
            }
        }
        let summ = arr.reduce(function (a, b) {
            return a + b;
        });
        return Boolean(!(summ % 10));
    }

    date(month, year) {
        let date = new Date();
        if(month <= ("0" + (date.getMonth() + 1)).slice(-2) && year <= date.getFullYear()){
            return false;
        }
        return true;
    }
}