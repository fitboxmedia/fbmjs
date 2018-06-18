'use strict';

var XMLHttpFactories = [
    function () {return new XMLHttpRequest()},
    function () {return new ActiveXObject("Msxml3.XMLHTTP")},
    function () {return new ActiveXObject("Msxml2.XMLHTTP.6.0")},
    function () {return new ActiveXObject("Msxml2.XMLHTTP.3.0")},
    function () {return new ActiveXObject("Msxml2.XMLHTTP")},
    function () {return new ActiveXObject("Microsoft.XMLHTTP")}
];

function createXMLHTTPObject() {
    var xmlhttp = false;
    for (var i=0;i<XMLHttpFactories.length;i++) {
        try {
            xmlhttp = XMLHttpFactories[i]();
        }
        catch (e) {
            continue;
        }
        break;
    }
    return xmlhttp;
}


function ajax(type, url, params, callback) {
    var xhttp = new createXMLHTTPObject();

    params = typeof params === 'string' ? params : Object.keys(params).map(
        function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]) }
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

function importClick() {
    var params = {
        pageType: pageType,
        requestUri: location.href,
        action: 'click'
    };

    ajax("GET", 'sdk.php', params, function (response) {
        var response = JSON.parse(response.responseText);
        if (response['pixel'] !== undefined && response['pixel'] !== false ) {
            var pixel = document.createElement('div');
            pixel.innerHTML = response['pixel'];
            document.body.appendChild(pixel);
        }
    });
}

function formToObject(form) {
    var params = {};
    var i = 0;
    while (i < form.length) {
        if (form[i].name !== "")
            params[form[i].name] = form[i].value;
        i++;
    }
    return params;
}

function isValidPostalCode(postalCode, countryCode) {
    var postalCodeRegex = '';
    switch (countryCode) {
        case "US":
            postalCodeRegex = /^\d{5}$|^\d{5}-\d{4}$/;
            break;
        case "CA":
            postalCodeRegex = /^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/;
            break;
        case "FR":
            postalCodeRegex = /^[0-9]{5}$/;
            break;
        case "AU":
            postalCodeRegex = /^[0-9]{4}$/;
            break;
        default:
            return true;
    }

    return postalCodeRegex.test(postalCode);
}

function cvvValidate(value) {
    return /^[0-9]{3,4}$/.test(value)
}

function phoneValidate(value) {
    if(!value.match(/^[0-9()-\s]{7,15}$/))
        return false;

    value = value.replace(/[^0-9]/,'');
    if(value.length >= 8)
        return true;
}

function emailValidate(value) {
    var regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
    if(regex.test(value))
        return true;

    return false;
}

function fieldValidate(form) {
    var error = false;
    for (var index in form) {
        var element = document.getElementsByName(index)[0];
        if (element.value.trim().length === 0) {
            element.style.border = '1px solid red';
            error = true;
        }
    }

    return error;
}

function error(element) {
    document.getElementsByName(element)[0].style.border = '1px solid red';
}

function hideError(form) {
    for (var index in form) {
        document.getElementsByName(index)[0].style.border = '1px solid #dfdfdf';
    }
}

function importLead(e) {
    e.preventDefault();
    Overlay.start();
    var params = this.querySelectorAll('input, select');
    var form = formToObject(params);
    form['phoneNumber'] = form['phoneNumber'].substr(1);
    var errors = false;
    hideError(form);
    if (fieldValidate(form)) {
        errors = true;
    }
    var country = form['country'];
    if (['US', 'CA', 'FR'].indexOf(country) >= 0) {
        if (!isValidPostalCode(form['postalCode'], country)) {
            error('postalCode');
            errors = true;
        }
    }

    if (!phoneValidate(form['phoneNumber'])) {
        error('phoneNumber');
        errors = true;
    }

    if (!emailValidate(form['email'])) {
        error('email');
        errors = true;
    }

    if (errors) {
        Overlay.stop();
        return false;
    }

    form["action"] = "importLead";
    form["requestUri"] = location.href;
    form["pageType"] = pageType;
    var orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
    if (orientation !== undefined) {
        form["screen_orientation"] = orientation.type;
    } else {
        form["screen_orientation"] = null;
    }
    form["cookie_enabled"] = navigator.cookieEnabled;
    form["do_not_track"] = navigator.doNotTrack;
    form['redirect'] = redirectTo;

    new Fingerprint2({
        detectScreenOrientation: true,
        userDefinedFonts: false,
        excludeJsFonts: false,
        excludeFlashFonts: false
    }).get(function (result, components) {
        form["device_fingerprint"] = result;
        Object.keys(components).forEach(function (t) {
            if (components[t]["key"] === "language") {
                form["language"] = components[t]["value"]
            }
            if (components[t]["key"] === "resolution") {
                form["screen_resolution"] = components[t]["value"][0] + 'x' + components[t]["value"][1]
            }
            if (components[t]["key"] === "timezone_offset") {
                form["timezone_offset"] = components[t]["value"]
            }
            if (components[t]["key"] === "navigator_platform") {
                form["os"] = components[t]["value"]
            }
            if (components[t]["key"] === "cpu_class") {
                form["cpu_class"] = components[t]["value"] === "unknown" ? null : components[t]["value"]
            }
        });
        ajax("POST", 'sdk.php', form, function (response) {
            Overlay.stop();
            response = JSON.parse(response.responseText);
            if (response.status === "success") {
                enableUnload();
                location.href = redirectTo;
            } else {
                if (response.status === "validation_error") {
                    document.getElementsByName('postalCode')[0].style.border = '1px solid red';
                }
                else {
                    setPopup();
                }

            }
        });
    });
}

function importOrder(e) {
    e.preventDefault();
    var params = this.querySelectorAll('input, select');
    var form = formToObject(params);
    form['cardNumber'] = form['cardNumber'].split(" ").join("");
    hideError(form);
    var errors = false;
    if (!cvvValidate(form['cardSecurityCode'])) {
        error('cardSecurityCode');
        errors = true;
    }
    if (!cardValidate(form["cardNumber"])) {
        error('cardNumber');
        errors = true;
    }
    if(!dateValidate(form["cardMonth"],form["cardYear"])){
        error('cardMonth');
        error('cardYear');
        errors = true;
    }

    if (errors) {
        return false;
    }

    Overlay.start();
    form["action"] = "importOrder";
    form["requestUri"] = location.href;
    form["pageType"] = pageType;
    form['currency'] = 'USD';
    var orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
    if (orientation !== undefined) {
        form["screen_orientation"] = orientation.type;
    } else {
        form["screen_orientation"] = null;
    }
    form["cookie_enabled"] = navigator.cookieEnabled;
    form["do_not_track"] = navigator.doNotTrack;

    new Fingerprint2({
        detectScreenOrientation: true,
        userDefinedFonts: false,
        excludeJsFonts: false,
        excludeFlashFonts: false
    }).get(function (result, components) {
        form["device_fingerprint"] = result;
        Object.keys(components).forEach(function (t) {
            if (components[t]["key"] === "language") {
                form["language"] = components[t]["value"]
            }
            if (components[t]["key"] === "resolution") {
                form["screen_resolution"] = components[t]["value"][0] + 'x' + components[t]["value"][1]
            }
            if (components[t]["key"] === "timezone_offset") {
                form["timezone_offset"] = components[t]["value"]
            }
            if (components[t]["key"] === "navigator_platform") {
                form["os"] = components[t]["value"]
            }
            if (components[t]["key"] === "cpu_class") {
                form["cpu_class"] = components[t]["value"] === "unknown" ? null : components[t]["value"]
            }
        });
        ajax("POST", 'sdk.php', form, function (response) {
            Overlay.stop();
            response = JSON.parse(response.responseText);
            if (response.status === "success") {
                enableUnload();
                location.href = redirectTo;
            } else {
                if (response.messages !== undefined) {
                    popUp(response.messages !== "" ? response.messages : " ")
                } else {
                    setPopup();
                }
            }
        });
    });
}

function importUpsell(e) {
    e.preventDefault();
    Overlay.start();
    var params  = this.querySelectorAll('input');
    var form = formToObject(params);
    form['action'] = 'importUpsell';
    form["requestUri"]   = location.href;
    form["pageType"] = pageType;
    var orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
    if (orientation !== undefined) {
        form["screen_orientation"] = orientation.type;
    } else {
        form["screen_orientation"] = null;
    }
    form["cookie_enabled"] = navigator.cookieEnabled;
    form["do_not_track"] = navigator.doNotTrack;

    new Fingerprint2({
        detectScreenOrientation: true,
        userDefinedFonts : false,
        excludeJsFonts: false,
        excludeFlashFonts: false
    }).get(function(result, components){
        form["device_fingerprint"] = result;
        Object.keys(components).forEach(function (t) {
            if (components[t]["key"] === "language") {
                form["language"] = components[t]["value"]
            }
            if (components[t]["key"] === "resolution") {
                form["screen_resolution"] = components[t]["value"][0] + 'x' + components[t]["value"][1]
            }
            if (components[t]["key"] === "timezone_offset") {
                form["timezone_offset"] = components[t]["value"]
            }
            if (components[t]["key"] === "navigator_platform") {
                form["os"] = components[t]["value"]
            }
            if (components[t]["key"] === "cpu_class") {
                form["cpu_class"] = components[t]["value"] === "unknown" ? null : components[t]["value"]
            }
        });
        ajax("POST", 'sdk.php', form, function (response) {
            Overlay.stop();
            response = JSON.parse(response.responseText);
            if (response.status === "success") {
                enableUnload();
                location.href = redirectTo;
            } else {
                setPopup();
            }
        });
    });
}

function showDescriptors() {
    var params = {
        action: 'descriptor'
    };

    ajax("GET", 'sdk.php', params, function (response) {
        response = JSON.parse(response.responseText);
        if (response.status === "success") {
            var descriptors = response.descriptors.join(' <br>');
            document.getElementById('descriptors').innerHTML += descriptors;
        }
    });
}

var Overlay = {
    start: function () {
        var overlay = document.createElement('div');
        overlay.setAttribute('id', 'overlay');
        overlay.setAttribute('style', 'left: 0;right: 0;background-color: rgba(45, 45, 45, 0.6);z-index: 999;top: 0;position: fixed;bottom: 0;');
        document.body.appendChild(overlay);
        var loading = document.createElement('div');
        loading.className = 'loader';
        overlay.appendChild(loading);
        var style = document.createElement('style');
        style.appendChild(document.createTextNode(".loader {margin: 0 auto; margin-top: 20%; border: 8px solid #f3f3f3;border-top: 8px solid #3498db;border-radius: 50%;width: 60px;height: 60px;animation: spin 2s linear infinite;}@keyframes spin {0% { transform: rotate(0deg); }100% { transform: rotate(360deg); }}"));
        overlay.appendChild(style);
    },
    stop: function () {
        var overlay = document.getElementById('overlay');
        document.body.removeChild(overlay);
    }
};

function enableUnload() {
    window.onbeforeunload =  function () {
        return;
    };
}

function getStates() {
    var states = {
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

    var selectState = document.getElementsByName('state');

    if (selectState[0] === undefined || selectState[0] === null) {
        return;
    }

    var stateList = states[landingCountry];
    var options = getSelectState(landingCountry);
    Object.keys(stateList).forEach(function (k) {
        options += '<option value="' + k + '">' + stateList[k] + '</option>';
    });
    selectState[0].innerHTML = options;

}

function getSelectState(country) {
    var selectState = 'Select State';
    switch (country) {
        case "NOK":
            selectState = 'Velg stat';
            break;
        case "FRA":
            selectState = 'Séléctionnez la province';
            break;
        case "SWE":
            selectState = 'Välj ett land';
            break;
    }

    return '<option value="">' + selectState + '</option>';
}

function phoneFormater() {
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
            if (this.hasAttribute('readonly')) {
                this.removeAttribute('readonly')
            }
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

function cardValidate(value) {
    if (value.trim().length < 16) {
        return false;
    }
    var arr = [],
        card_number = value.toString();

    if (card_number.length < 16) {
        return false;
    }

    if (!isFinite(parseInt(+card_number))) {
        return false;
    }

    for (var i = 0; i < card_number.length; i++) {
        if (i % 2 === 0) {
            var m = parseInt(card_number[i]) * 2;
            if (m > 9) {
                arr.push(m - 9);
            } else {
                arr.push(m);
            }
        } else {
            var n = parseInt(card_number[i]);
            arr.push(n)
        }
    }
    var summ = arr.reduce(function (a, b) {
        return a + b;
    });
    return Boolean(!(summ % 10));
}

function dateValidate(month, year) {
    var date = new Date();
    if(month <= ("0" + (date.getMonth() + 1)).slice(-2) && year <= date.getFullYear()){
        return false;
    }
    return true;
}

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}


function popUp(messages = "") {
    var popup = document.createElement('div');
    var overlay = document.createElement('div');

    var countryListFirst = {
        "USA": "We've encountered an error while processing your order. Please contact our customer service team at: <br><br>Email: <a href=\"mailto:customer_support@" + location.host + "\" />customer_support@" + location.host + "</a><br>Phone: <span>1-877-886-1776</span>",
        "NOK": "Det oppstod en feil ved behandling av bestillingen din. Ta kontakt med vår kundeservice via:<br><br>E-post: <a href=\"mailto:support@" + location.host + "\" />support@" + location.host + "</a><br>Telefon: <span>+44-2039365433</span>",
        "FRA": "Une erreur est survenue durant votre commande. Merci de contacter notre Service Client au:<br><br>Email: <a href=\"mailto:support@" + location.host + "\" />support@" + location.host + "</a><br>Téléphone: 0805-089-013",
        "CA" : "We've encountered an error while processing your order. Please contact our customer service team at: <br><br>Email: <a href=\"mailto:customer_support@" + location.host + "\" />customer_support@" + location.host + "</a><br>Phone: <span>1-877-886-1776</span>",
        "AUS": "We've encountered an error while processing your order. Please contact our customer service team at: <br><br>Email: <a href=\"mailto:customer_support@" + location.host + "\" />customer_support@" + location.host + "</a><br>Phone: <span>1-877-886-1776</span>",
        "SWE": "Vi har stött på ett fel när du behandlar din beställning. Vänligen kontakta vår kundtjänst på: <br><br>Email: <a href=\"mailto:customer_support@" + location.host + "\" />customer_support@" + location.host + "</a><br>Fon: <span>1-877-886-1776</span>"
    };

    var countryList = {
        "USA": "We've encountered an error while processing your order. Please contact our customer service team at: <br><br>Email: <a href=\"mailto:customer_support@" + location.host + "\" />customer_support@" + location.host + "</a><br>Phone: <span>1-877-886-1776</span>",
        "NOK": "Det oppstod en feil ved behandling av bestillingen din. Ta kontakt med vår kundeservice via:<br><br>E-post: <a href=\"mailto:support_no@" + location.host + "\" />support_no@" + location.host + "</a><br>Telefon: <span>800-24-881</span>",
        "FRA": "Une erreur est survenue durant votre commande. Merci de contacter notre Service Client au:<br><br>Email: <a href=\"mailto:support_fr@" + location.host + "\" />support_fr@" + location.host + "</a><br>Téléphone: 0805-089-013",
        "CA" : "We've encountered an error while processing your order. Please contact our customer service team at: <br><br>Email: <a href=\"mailto:customer_support@" + location.host + "\" />customer_support@" + location.host + "</a><br>Phone: <span>1-877-886-1776</span>",
        "AUS": "We've encountered an error while processing your order. Please contact our customer service team at: <br><br>Email: <a href=\"mailto:customer_support@" + location.host + "\" />customer_support@" + location.host + "</a><br>Phone: <span>1-877-886-1776</span>",
        "SWE": "Vi har stött på ett fel när du behandlar din beställning. Vänligen kontakta vår kundtjänst på: <br><br>Email: <a href=\"mailto:customer_support@" + location.host + "\" />customer_support@" + location.host + "</a><br>Fon: <span>1-877-886-1776</span>"
    };

    if('santege.com' === location.host){
        countryList = countryListFirst;
    }

    overlay.setAttribute('class', 'overlay');
    popup.setAttribute('class', 'modal');
    if (messages === "") {
        popup.innerHTML = countryList[landingCountry];
    } else {
        popup.innerHTML = "<a href=\"javascript:void(0);\" onclick=\"document.getElementsByClassName('overlay')[0].remove()\" style=\"position: absolute;top: 0;right: 10px;font-weight: bold;color: #ccc;\">×</a><h4 style=\"text-align: center;color: #ce0101;font-family: 'Arial';\">Payment Failed</h4><p style=\"font-size: 20px;font-weight: bold;line-height: 52px;font-family: 'Arial';text-align: center;\">Please, try another card or contact you bank. <br>" + messages + "</p>";
    }

    var style = document.createElement('style');
    var styleCode = ".modal {position: absolute;top: 25%;left: 25%;right: 25%;width: 30%;height: 160px;background: #fff;box-shadow: 0 0 20px rgba(0,0,0,0.7);margin: 0 auto;padding:30px 20px;font-size: 18px;line-height: 28px;border-radius:12px;font-family: 'Times New Roman';}.modal a {text-decoration: none;font-size: 20px;font-family: 'Times New Roman';} .modal span {font-weight: bold;font-size: 20px;font-family: 'Times New Roman';} .overlay{height: 100%;width: 100%;background: rgba(51, 51, 51, 0.43);position: fixed;top: 0;left: 0;z-index: 9999;} @media (max-width: 860px) { .modal {left: 0;right: 0;width: initial;height: 180px; font-size: 16px;} .modal a {font-size: 16px;}}";
    style.appendChild(document.createTextNode(styleCode));
    document.body.appendChild(style);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
}

function setPopup() {
    if (typeof Storage !== "undefined") {
        localStorage.setItem("popup", "visible");
    } else {
        document.cookie = "popup=visible; path=/;";
    }

    popUp();
}

function getPopup() {
    if (typeof Storage !== "undefined") {
        if (localStorage.getItem("popup") !== null) {
            popUp();
        }
    } else {
        if (getCookie("popup") !== undefined) {
            popUp();
        }
    }
}

window.onload = function () {
    importClick();
    getStates();
    getPopup();
    phoneFormater();

    var leadPage = document.getElementById('lead-form');
    var checkoutPage = document.getElementById('checkout-form');
    var upsellPage = document.getElementById('upsell');

    if (typeof leadPage !== undefined && leadPage !== null) {
        leadPage.addEventListener('submit',importLead);
    }

    if (typeof checkoutPage !== undefined && checkoutPage !== null) {
        document.getElementById('productName').value = productName;
        document.getElementById('productId').value = productId;
        document.getElementById('productAmount').value = productAmount;
        document.getElementById('productShipping').value = productShipping;
        checkoutPage.addEventListener('submit', importOrder);
        enableUnload()
    }

    if (typeof upsellPage !== undefined && upsellPage !== null) {
        document.getElementById('productName').value = productName;
        document.getElementById('productId').value = productId;
        document.getElementById('productAmount').value = productAmount;
        document.getElementById('productShipping').value = productShipping;
        upsellPage.addEventListener('submit', importUpsell)
        var noThanksBtn = document.getElementById('no-upsell-link');
        noThanksBtn.addEventListener('click', function () {
            enableUnload();
        })
    }


    if (typeof checkoutPage === "undefined") {
        history.pushState(null, null, location.href);
        window.onpopstate = function () {
            history.go(1);
        };
        window.onbeforeunload =  function () {
            return false;
        };
    }

    if (pageType !== undefined && pageType === 'thankyouPage') {
        showDescriptors();
    }
};
