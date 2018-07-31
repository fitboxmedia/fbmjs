class Ajax{
    constructor(type, url, params, callback) {
        let xhttp = this.createXMLHTTPObject();

        params = typeof params === 'string' ? params : Object.keys(params).map(
            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]); }
        ).join('&');

        if (type === "GET") {
            url = url + "?" + params;
        }

        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                if (typeof callback === "function") {
                    callback(this);
                }
            }
        };

        xhttp.open(type, url, true);
        xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        if (type === "POST") {
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }

        xhttp.send(params);
    }

    createXMLHTTPObject() {
        let xmlhttp = false;
        let XMLHttpFactories = this.getXMLHttpFactories();

        for (let i=0;i<XMLHttpFactories.length;i++) {
            try {
                xmlhttp = XMLHttpFactories[i];
            }
            catch (e) {
                continue;
            }
            break;
        }
        return new xmlhttp;
    }

    getXMLHttpFactories() {
        return [
            function () {return new XMLHttpRequest();},
            function () {return new ActiveXObject("Msxml3.XMLHTTP");},
            function () {return new ActiveXObject("Msxml2.XMLHTTP.6.0");},
            function () {return new ActiveXObject("Msxml2.XMLHTTP.3.0");},
            function () {return new ActiveXObject("Msxml2.XMLHTTP");},
            function () {return new ActiveXObject("Microsoft.XMLHTTP");}
        ];
    }
}

class Unload{
    static enable(){
        window.onbeforeunload =  function () {
            return;
        };
    }
}

class Formater{
    static phone(){
        var phoneNumber = document.getElementsByName('phoneNumber')[0];
        if (phoneNumber !== undefined && phoneNumber !== null) {
            var countryList = {
                'USA': '+1',
                'NOK': '+47',
                'FRA': '+33',
                'CA' : '+1',
                'AUS': '+61',
                'SWE': '+46'
            };
            phoneNumber.onfocus = function() {
                if (this.value.length >= countryList[landingCountry].length) {
                    this.value = this.value;
                } else {
                    this.value = countryList[landingCountry];
                }
                this.selectionStart = this.selectionEnd  = this.value.length;
                this.focus();
            };
            phoneNumber.onmousedown = function(e){
                this.focus();
                e.preventDefault();
            };
            phoneNumber.onkeydown = function (e) {
                if (e.keyCode === 9) {
                    return;
                }
                if (e.keyCode === 8 && this.value.length <= countryList[landingCountry].length || e.keyCode === 32) {
                    e.preventDefault();return;
                }
                if(!isFinite(e.key) && e.keyCode !== 8) {
                    e.preventDefault();
                }
            }
        }
    }
}

class States{
    static getAll() {
        let states = {
            "USA": {
                "AL": "Alabama",
                "AK": "Alaska",
                "AS": "American Samoa",
                "AZ": "Arizona",
                "AR": "Arkansas",
                "CA": "California",
                "CO": "Colorado",
                "CT": "Connecticut",
                "DE": "Delaware",
                "DC": "District Of Columbia",
                "FM": "Federated States Of Micronesia",
                "FL": "Florida",
                "GA": "Georgia",
                "GU": "Guam",
                "HI": "Hawaii",
                "ID": "Idaho",
                "IL": "Illinois",
                "IN": "Indiana",
                "IA": "Iowa",
                "KS": "Kansas",
                "KY": "Kentucky",
                "LA": "Louisiana",
                "ME": "Maine",
                "MH": "Marshall Islands",
                "MD": "Maryland",
                "MA": "Massachusetts",
                "MI": "Michigan",
                "MN": "Minnesota",
                "MS": "Mississippi",
                "MO": "Missouri",
                "MT": "Montana",
                "NE": "Nebraska",
                "NV": "Nevada",
                "NH": "New Hampshire",
                "NJ": "New Jersey",
                "NM": "New Mexico",
                "NY": "New York",
                "NC": "North Carolina",
                "ND": "North Dakota",
                "MP": "Northern Mariana Islands",
                "OH": "Ohio",
                "OK": "Oklahoma",
                "OR": "Oregon",
                "PW": "Palau",
                "PA": "Pennsylvania",
                "PR": "Puerto Rico",
                "RI": "Rhode Island",
                "SC": "South Carolina",
                "SD": "South Dakota",
                "TN": "Tennessee",
                "TX": "Texas",
                "UT": "Utah",
                "VT": "Vermont",
                "VI": "Virgin Islands",
                "VA": "Virginia",
                "WA": "Washington",
                "WV": "West Virginia",
                "WI": "Wisconsin",
                "WY": "Wyoming"
            },
            "CAN" : {
                "AB": "Alberta",
                "BC": "British Columbia",
                "MB": "Manitoba",
                "NB": "New Brunswick",
                "NL": "Newfoundland and Labrador",
                "NS": "Nova Scotia",
                "NU": "Nunavut",
                "NT": "Northwest Territories",
                "ON": "Ontario",
                "PE": "Prince Edward Island",
                "QC": "Quebec",
                "SK": "Saskatchewan",
                "YT": "Yukon"
            },
            "NOK" : {
                "AK": "Akershus",
                "AA": "Aust-Agder",
                "BU": "Buskerud",
                "FI": "Finnmark",
                "HE": "Hedmark",
                "HO": "Hordaland",
                "SJ": "Svalbard",
                "MR": "M\u00f8re og Romsdal",
                "NO": "Nord-Tr\u00f8ndelag",
                "NT": "Nordland",
                "OP": "Oppland",
                "OS": "Oslo",
                "RO": "Rogaland",
                "SF": "Sogn og Fjordane",
                "ST": "S\u00f8r-Tr\u00f8ndelag",
                "TE": "Telemark",
                "TR": "Troms",
                "VA": "Vest-Agder",
                "VF": "Vestfold",
                "OF": "\u00d8stfold"
            },
            "FRA" : {
                "01": "Ain",
                "02": "Aisne",
                "03": "Allier",
                "04": "Alpes-de-Haute-Provence",
                "06": "Alpes-Maritimes",
                "07": "Ard\u00e8che",
                "08": "Ardennes",
                "09": "Ari\u00e8ge",
                "10": "Aube",
                "11": "Aude",
                "12": "Aveyron",
                "67": "Bas-Rhin",
                "13": "Bouches-du-Rh\u00f4ne",
                "14": "Calvados",
                "15": "Cantal",
                "16": "Charente",
                "17": "Charente-Maritime",
                "18": "Cher",
                "CP": "Clipperton",
                "19": "Corr\u00e8ze",
                "2A": "Corse-du-Sud",
                "21": "C\u00f4te-d\u0027Or",
                "22": "C\u00f4tes-d\u0027Armor",
                "23": "Creuse",
                "79": "Deux-S\u00e8vres",
                "24": "Dordogne",
                "25": "Doubs",
                "26": "Dr\u00f4me",
                "91": "Essonne",
                "27": "Eure",
                "28": "Eure-et-Loir",
                "29": "Finist\u00e8re",
                "30": "Gard",
                "32": "Gers",
                "33": "Gironde",
                "68": "Haut-Rhin",
                "2B": "Haute-Corse",
                "31": "Haute-Garonne",
                "43": "Haute-Loire",
                "52": "Haute-Marne",
                "70": "Haute-Sa\u00f4ne",
                "74": "Haute-Savoie",
                "87": "Haute-Vienne",
                "05": "Hautes-Alpes",
                "65": "Hautes-Pyr\u00e9n\u00e9es",
                "92": "Hauts-de-Seine",
                "34": "H\u00e9rault",
                "35": "Ille-et-Vilaine",
                "36": "Indre",
                "37": "Indre-et-Loire",
                "38": "Is\u00e8re",
                "39": "Jura",
                "40": "Landes",
                "41": "Loir-et-Cher",
                "42": "Loire",
                "44": "Loire-Atlantique",
                "45": "Loiret",
                "46": "Lot",
                "47": "Lot-et-Garonne",
                "48": "Loz\u00e8re",
                "49": "Maine-et-Loire",
                "50": "Manche",
                "51": "Marne",
                "53": "Mayenne",
                "YT": "Mayotte",
                "54": "Meurthe-et-Moselle",
                "55": "Meuse",
                "56": "Morbihan",
                "57": "Moselle",
                "58": "Ni\u00e8vre",
                "59": "Nord",
                "NC": "Nouvelle-Cal\u00e9donie",
                "60": "Oise",
                "61": "Orne",
                "75": "Paris",
                "62": "Pas-de-Calais",
                "PF": "Polyn\u00e9sie fran\u00e7aise",
                "63": "Puy-de-D\u00f4me",
                "64": "Pyr\u00e9n\u00e9es-Atlantiques",
                "66": "Pyr\u00e9n\u00e9es-Orientales",
                "69": "Rh\u00f4ne",
                "BL": "Saint-Barth\u00e9lemy",
                "MF": "Saint-Martin",
                "PM": "Saint-Pierre-et-Miquelon",
                "71": "Sa\u00f4ne-et-Loire",
                "72": "Sarthe",
                "73": "Savoie",
                "77": "Seine-et-Marne",
                "76": "Seine-Maritime",
                "93": "Seine-Saint-Denis",
                "80": "Somme",
                "81": "Tarn",
                "82": "Tarn-et-Garonne",
                "TF": "Terres Australes Fran\u00e7aises",
                "90": "Territoire de Belfort",
                "95": "Val-d\u0027Oise",
                "94": "Val-de-Marne",
                "83": "Var",
                "84": "Vaucluse",
                "85": "Vend\u00e9e",
                "86": "Vienne",
                "88": "Vosges",
                "WF": "Wallis et Futuna",
                "89": "Yonne",
                "78": "Yvelines"
            },
            'AUS': {
                'NSW': 'New South Wales',
                'QLD': 'Queensland',
                'SA': 'South Australia',
                'TAS': 'Tasmania',
                'VIC': 'Victoria',
                'WA': 'Western Australia',
                'ACT': 'Australian Capital Territory',
                'NT': 'Northern Territory',
            },
            "SWE": {
                "K": "Blekinge län",
                "W": "Dalarnas län",
                "X": "Gävleborgs län",
                "I": "Gotlands län",
                "N": "Hallands län",
                "Z": "Jämtlands län",
                "F": "Jönköpings län",
                "H": "Kalmar län",
                "G": "Kronobergs län",
                "BD": "Norrbottens län",
                "T": "Örebro län",
                "E": "Östergötlands län",
                "M": "Skåne län",
                "D": "Södermanlands län",
                "AB": "Stockholms län",
                "C": "Uppsala län",
                "S": "Värmlands län",
                "AC": "Västerbottens län",
                "Y": "Västernorrlands län",
                "U": "Västmanlands län",
                "O": "Västra Götalands län"
            }
        };

        let selectState = document.getElementsByName('state');

        if (selectState[0] === undefined || selectState[0] === null) {
            return;
        }

        let stateList = states[landingCountry];
        let options = this.getState(landingCountry);
        Object.keys(stateList).forEach(function (k) {
            options += '<option value="' + k + '">' + stateList[k] + '</option>';
        });
        selectState[0].innerHTML = options;
    }

    static getState(country) {
        let selectState = 'Select State';
        switch (country) {
            case "NOK":
                selectState = 'Velg stat';
                break;
            case "FRA":
                selectState = 'Séléctionnez la province';
                break;
        }

        return '<option value="">' + selectState + '</option>';
    }
}

class Overlay{
    static start(){
        let overlay = document.createElement('div');
        overlay.setAttribute('id', 'overlay');
        overlay.setAttribute('style', 'left: 0;right: 0;background-color: rgba(45, 45, 45, 0.6);z-index: 999;top: 0;position: fixed;bottom: 0;');
        document.body.appendChild(overlay);
        let loading = document.createElement('div');
        loading.className = 'loader';
        overlay.appendChild(loading);
        let style = document.createElement('style');
        style.appendChild(document.createTextNode(".loader {margin: 0 auto; margin-top: 20%; border: 8px solid #f3f3f3;border-top: 8px solid #3498db;border-radius: 50%;width: 60px;height: 60px;animation: spin 2s linear infinite;}@keyframes spin {0% { transform: rotate(0deg); }100% { transform: rotate(360deg); }}"));
        overlay.appendChild(style);
    }

    static stop(){
        let overlay = document.getElementById('overlay');
        document.body.removeChild(overlay);
    }
}

class Cookie{
    static get(name){
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
}

class Popup{
    static set() {
        if (typeof Storage !== "undefined") {
            localStorage.setItem("popup", "visible");
        } else {
            document.cookie = "popup=visible; path=/;";
        }

        this.popUp();
    }

    static get() {
        if (typeof Storage !== "undefined") {
            if (localStorage.getItem("popup") !== null) {
                this.popUp();
            }
        } else {
            if (Cookie.get("popup") !== undefined) {
                this.popUp();
            }
        }
    }

    static popUp(messages = "") {
        var popup = document.createElement('div');
        var overlay = document.createElement('div');

        var countryList = {
            "USA": "We've encountered an error while processing your order. Please contact our customer service team at: <br><br>Email: <a href=\"mailto:" + customerEmail + "\" />" + customerEmail + "</a><br>Phone: <span>" + customerPhone + "</span>",
            "CA" : "We've encountered an error while processing your order. Please contact our customer service team at: <br><br>Email: <a href=\"mailto:" + customerEmail + "\" />" + customerEmail + "</a><br>Phone: <span>" + customerPhone + "</span>",
            "AUS": "We've encountered an error while processing your order. Please contact our customer service team at: <br><br>Email: <a href=\"mailto:" + customerEmail + "\" />" + customerEmail + "</a><br>Phone: <span>" + customerPhone + "</span>",
            "NOK": "Det oppstod en feil ved behandling av bestillingen din. Ta kontakt med vår kundeservice via:<br><br>E-post: <a href=\"mailto:" + customerEmail + "\" />" + customerEmail + "</a><br>Telefon: <span>" + customerPhone + "</span>",
            "FRA": "Une erreur est survenue durant votre commande. Merci de contacter notre Service Client au:<br><br>E-mail: <a href=\"mailto:" + customerEmail + "\" />" + customerEmail + "</a><br>Téléphone: <span>" + customerPhone + "</span>",
            "SWE": "Vi har stött på ett fel när du behandlar din beställning. Vänligen kontakta vår kundtjänst på: <br><br>E-post: <a href=\"mailto:" + customerEmail + "\" />" + customerEmail + "</a><br>Telefonnummer: <span>" + customerPhone + "</span>"
        };

        overlay.setAttribute('class', 'notifyOverlay');
        popup.setAttribute('class', 'notifyModal');
        if (messages === "") {
            popup.innerHTML = countryList[landingCountry];
        } else {
            popup.innerHTML = "<a href=\"javascript:void(0);\" onclick=\"document.getElementsByClassName('notifyOverlay')[0].remove()\" style=\"position: absolute;top: 0;right: 10px;font-weight: bold;color: #ccc;\">×</a><h4 style=\"text-align: center;color: #ce0101;font-family: 'Arial';\">Payment Failed</h4><p style=\"font-size: 20px;font-weight: bold;line-height: 52px;font-family: 'Arial';text-align: center;\">Please, try another card or contact you bank. <br>" + messages + "</p>";
        }

        var style = document.createElement('style');
        var styleCode = ".notifyModal {position: absolute;top: 25%;left: 25%;right: 25%;width: 30%;height: 160px;background: #fff;box-shadow: 0 0 20px rgba(0,0,0,0.7);margin: 0 auto;padding:30px 20px;font-size: 18px;line-height: 28px;border-radius:12px;font-family: 'Times New Roman';}.notifyModal a {text-decoration: none;font-size: 20px;font-family: 'Times New Roman';} .notifyModal span {font-weight: bold;font-size: 20px;font-family: 'Times New Roman';} .notifyOverlay{height: 100%;width: 100%;background: rgba(51, 51, 51, 0.43);position: fixed;top: 0;left: 0;z-index: 9999;} @media (max-width: 860px) { .notifyModal {left: 0;right: 0;width: initial;height: 180px; font-size: 16px;} .notifyModal a {font-size: 16px;}}";
        style.appendChild(document.createTextNode(styleCode));
        document.body.appendChild(style);
        overlay.appendChild(popup);
        document.body.appendChild(overlay);
    }
}

class Descriptors{
    static show(){
        let params = {
            action: 'descriptor'
        };

        new Ajax("GET", 'sdk.php', params, function (response) {
            response = JSON.parse(response.responseText);
            if (response.status === "success") {
                let descriptors = response.descriptors.join(' ');
                document.getElementById('descriptors').innerHTML += descriptors;
            }
        });
    }
}

class Error {
    static set(element) {
        element = document.getElementsByName(element)[0];
        element.style.border = '1px solid red';
    }

    static leadForm(element) {
        element.style.border = '1px solid red';

        let errorMassegeElement = element.nextElementSibling;

        if (errorMassegeElement) {
            element.nextElementSibling.style.visibility = "visible";
        }
    }

    static hideLead(element) {
        element.style.border = '1px solid #dfdfdf';

        let errorMassegeElement = element.nextElementSibling;

        if (errorMassegeElement) {
            errorMassegeElement.style.visibility = "hidden";
        }
    }

    static hideCheckoutForm(form) {
        for (let index in form) {
            let element = document.getElementsByName(index)[0];
            if (index === "date"){
                document.getElementsByName("cardMonth")[0].style.border = '1px solid #dfdfdf';
                document.getElementsByName("cardYear")[0].style.border = '1px solid #dfdfdf';
            } else {
                element.style.border = '1px solid #dfdfdf';
            }
        }
    }
}

class Import{
    constructor(e) {
        e.preventDefault();
        Overlay.start();
    }

    formToObject(form){
        let params = {};
        let i = 0;
        while (i < form.length) {
            if (form[i].name !== "")
                params[form[i].name] = form[i].value;
            i++;
        }
        return params;
    }

    queryServer(form, checkResult){
        let orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;

        if (orientation !== undefined) {
            form["screen_orientation"] = orientation.type;
        } else {
            form["screen_orientation"] = null;
        }

        new Fingerprint2({
            detectScreenOrientation: true,
            userDefinedFonts: false,
            excludeJsFonts: false,
            excludeFlashFonts: false
        }).get(function (result, components) {
            form["device_fingerprint"] = result;
            Object.keys(components).forEach(function (t) {
                if (components[t]["key"] === "language") {
                    form["language"] = components[t]["value"];
                }
                if (components[t]["key"] === "resolution") {
                    form["screen_resolution"] = components[t]["value"][0] + 'x' + components[t]["value"][1];
                }
                if (components[t]["key"] === "timezone_offset") {
                    form["timezone_offset"] = components[t]["value"];
                }
                if (components[t]["key"] === "navigator_platform") {
                    form["os"] = components[t]["value"];
                }
                if (components[t]["key"] === "cpu_class") {
                    form["cpu_class"] = components[t]["value"] === "unknown" ? null : components[t]["value"];
                }
            });
            new Ajax("POST", 'sdk.php', form, checkResult);
        });
    }

    static click(){
        let params = {
            pageType: pageType,
            requestUri: location.href,
            action: 'click'
        };
        new Ajax("GET", 'sdk.php', params, function (response) {
            let respons = JSON.parse(response.responseText);
            if (respons['pixel'] !== undefined && respons['pixel'] !== false ) {
                let pixel = document.createElement('div');
                pixel.innerHTML = respons['pixel'];
                document.body.appendChild(pixel);
            }
        });
    }
}

class Lead{
    constructor() {
        this.params = document.querySelectorAll("input, select");
        this.form = this.getTestForm(this.params);
        this.validator = new Validator(this.form);

        this.validationEvents();
    }

    getTestForm(form) {
        let params = {
            "firstName" : {
                object: form[0],
                type: "initial"
            },
            "lastName" : {
                object: form[1],
                type: "initial"
            },
            "email" : {
                object: form[2],
                type: "email"
            },
            "phoneNumber" : {
                object: form[3],
                value: form[3].value.substr(1),
                type: "phone"
            },
            "address" : {
                object: form[4],
                type: "address"
            },
            "city" : {
                object: form[5],
                type: "city"
            },
            "state" : {
                object: form[6],
                type: "field"
            },
            "country" : {
                object: form[7],
                type: "field"
            },
            "postalCode" : {
                object: form[8],
                type: "postalCode"
            }
        };
        return params;
    }

    submit(event) {
        let importLead = new Import(event);

        if(this.checkValidation()) {
            let form = importLead.formToObject(this.params);

            form["action"] = "importLead";
            form["requestUri"] = location.href;
            form["pageType"] = pageType;
            form["cookie_enabled"] = navigator.cookieEnabled;
            form["do_not_track"] = navigator.doNotTrack;
            form['redirect'] = redirectTo;

            importLead.queryServer(form, function (response) {
                    Overlay.stop();
                    response = JSON.parse(response.responseText);
                    if (response.status === "success") {
                        Unload.enable();
                        location.href = redirectTo;
                    } else {
                        if (response.status === "validation_error") {
                            document.getElementsByName('postalCode')[0].style.border = '1px solid red';
                        }
                        else {
                            Popup.set();
                        }
                    }
                }
            );
        } else {
            Overlay.stop();
        }
    }

    objectValidationCheck(validator, object, type, countryValue) {
        Error.hideLead(object);
        let answer = function () {
            let result = "";

            if (type === "postalCode") {
                result = validator.validate(type, object.value, countryValue);
                return result;
            }
            result = validator.validate(type, object.value);
            return result;
        };
        if (answer()) {
            return true;
        } else {
            Error.leadForm(object);
            return false;
        }
    }

    validationEvents() {
        if (this.validator.formTypes) {
            let self = this;
            let countryValue = self.form["country"].object.value;

            for (let element in self.form) {
                self.form[element].object.addEventListener("focusout", function () {
                    self.objectValidationCheck(self.validator, self.form[element].object, self.form[element].type, countryValue);
                });
            }
        }
    }

    checkValidation() {
        let errors = false;

        if (this.validator.formTypes) {
            let countryValue = this.form["country"].object.value;

            for (let element in this.form) {
                let answer = this.objectValidationCheck(this.validator, this.form[element].object, this.form[element].type, countryValue);

                if(!answer) {
                    errors = true;
                }
            }
        } else {
            errors = true;
        }

        if (errors) {
            return false;
        }
        return true;
    }
}

class Order extends Import{
    constructor(e){
        super(e);

        let params = document.querySelectorAll("input[name='cardNumber'], input[name='cardSecurityCode'], select[name='cardMonth'], select[name='cardYear']");
        let form = this.getTestForm(params);

        if(this.validation(form)) {
            params = document.querySelectorAll("input, select");
            form = super.formToObject(params);

            form["action"] = "importOrder";
            form["requestUri"] = location.href;
            form["pageType"] = pageType;
            form['currency'] = 'USD';
            form["cookie_enabled"] = navigator.cookieEnabled;
            form["do_not_track"] = navigator.doNotTrack;

            super.queryServer(form, function (response) {
                    Overlay.stop();
                    response = JSON.parse(response.responseText);
                    if (response.status === "success") {
                        Unload.enable();
                        location.href = redirectTo;
                    } else {
                        if (response.messages !== undefined) {
                            Popup.popUp(response.messages !== "" ? response.messages : " ")
                        } else {
                            Popup.set();
                        }
                    }
                }
            );
        } else {
            Overlay.stop();
        }
    }

    getTestForm(form) {
        let params = {
            "cardNumber" : {
                value: form[0].value.split(" ").join(""),
                type: "card"
            },
            "cardSecurityCode" : {
                value: form[3].value,
                type: "cvv"
            },
            "date" : {
                month: form[1].value,
                year: form[2].value,
                type: "date"
            }
        };
        return params;
    }

    validation(form){
        let validator = new Validator(form);
        let errors = false;

        if (validator.formTypes) {
            Error.hideCheckoutForm(form);
            for (let elem in form) {
                let answer = function () {
                    let result = "";
                    if (elem === "date") {
                        result = validator.validate(elem, form[elem].month, form[elem].year);
                        return result;
                    }
                    result = validator.validate(form[elem].type, form[elem].value);
                    alert(result);
                    return result;
                };
                if (!answer()) {
                    errors = true;
                    if (elem === "date") {
                        Error.set("cardMonth");
                        Error.set("cardYear");
                    } else {
                        Error.set(elem);
                    }
                }
            }
        } else {
            errors = true;
        }

        if (errors) {
            return false;
        }
        return true;
    }
}

class Upsell extends Import{
    constructor(e){
        super(e);

        let params = document.querySelectorAll("input");
        let form = super.formToObject(params);

        form['action'] = 'importUpsell';
        form["requestUri"]   = location.href;
        form["pageType"] = pageType;
        form["cookie_enabled"] = navigator.cookieEnabled;
        form["do_not_track"] = navigator.doNotTrack;

        super.queryServer(form, function (response) {
                Overlay.stop();
                response = JSON.parse(response.responseText);
                if (response.status === "success") {
                    Unload.enable();
                    location.href = redirectTo;
                } else {
                    if (response.messages !== undefined) {
                        Popup.popUp(response.messages !== "" ? response.messages : " ")
                    } else {
                        Popup.set();
                    }
                }
            }
        );
    }
}

class Construct{
    constructor(){
        Import.click();
        States.getAll();
        Popup.get();
        Formater.phone();
        if(pageType.indexOf('upsellPage') + 1) {
            pageType = "upsellPage";
        }
        this[pageType]();
    }

    leadPage(){
        let form = document.getElementById('lead-form');
        if (typeof form !== undefined && form !== null) {

            let importLead = new Lead();

            form.addEventListener('submit', function (e) {
                importLead.submit(e);
            });
        }
    }

    checkoutPage(){
        let form = document.getElementById('checkout-form');
        if (typeof form !== undefined && form !== null) {
            document.getElementById('productName').value = productName;
            document.getElementById('productId').value = productId;
            document.getElementById('productAmount').value = productAmount;
            document.getElementById('productShipping').value = productShipping;
            form.addEventListener('submit', function (e) {
                new Order(e);
            });
            Unload.enable();
        } else if (typeof form === "undefined") {
            history.pushState(null, null, location.href);
            window.onpopstate = function () {
                history.go(1);
            };
            window.onbeforeunload =  function () {
                return false;
            };
        }
    }

    upsellPage(){
        let form = document.getElementById('upsell');
        if (typeof form !== undefined && form !== null) {
            document.getElementById('productName').value = productName;
            document.getElementById('productId').value = productId;
            document.getElementById('productAmount').value = productAmount;
            document.getElementById('productShipping').value = productShipping;
            form.addEventListener('submit', function (e) {
                new Upsell(e);
            });
            let noThanksBtn = document.getElementById('no-upsell-link');
            noThanksBtn.addEventListener('click', function () {
                Unload.enable();
            })
        }
    }

    thankyouPage(){
        if (pageType !== undefined && pageType === 'thankyouPage') {
            Descriptors.show();
        }
    }
}

window.onload = function () {
    new Construct();
};