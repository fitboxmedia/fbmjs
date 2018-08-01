'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ajax = function () {
    function Ajax(type, url, params, callback) {
        _classCallCheck(this, Ajax);

        var xhttp = this.createXMLHTTPObject();

        params = typeof params === 'string' ? params : Object.keys(params).map(function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
        }).join('&');

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

    _createClass(Ajax, [{
        key: 'createXMLHTTPObject',
        value: function createXMLHTTPObject() {
            var xmlhttp = false;
            var XMLHttpFactories = this.getXMLHttpFactories();

            for (var i = 0; i < XMLHttpFactories.length; i++) {
                try {
                    xmlhttp = XMLHttpFactories[i];
                } catch (e) {
                    continue;
                }
                break;
            }
            return new xmlhttp();
        }
    }, {
        key: 'getXMLHttpFactories',
        value: function getXMLHttpFactories() {
            return [function () {
                return new XMLHttpRequest();
            }, function () {
                return new ActiveXObject("Msxml3.XMLHTTP");
            }, function () {
                return new ActiveXObject("Msxml2.XMLHTTP.6.0");
            }, function () {
                return new ActiveXObject("Msxml2.XMLHTTP.3.0");
            }, function () {
                return new ActiveXObject("Msxml2.XMLHTTP");
            }, function () {
                return new ActiveXObject("Microsoft.XMLHTTP");
            }];
        }
    }]);

    return Ajax;
}();

var Unload = function () {
    function Unload() {
        _classCallCheck(this, Unload);
    }

    _createClass(Unload, null, [{
        key: 'enable',
        value: function enable() {
            window.onbeforeunload = function () {
                return;
            };
        }
    }]);

    return Unload;
}();

var Formater = function () {
    function Formater() {
        _classCallCheck(this, Formater);
    }

    _createClass(Formater, null, [{
        key: 'phone',
        value: function phone() {
            var phoneNumber = document.getElementsByName('phoneNumber')[0];
            if (phoneNumber !== undefined && phoneNumber !== null) {
                var countryList = {
                    'USA': '+1',
                    'NOK': '+47',
                    'FRA': '+33',
                    'CA': '+1',
                    'AUS': '+61',
                    'SWE': '+46'
                };
                phoneNumber.onfocus = function () {
                    if (this.value.length >= countryList[landingCountry].length) {
                        this.value = this.value;
                    } else {
                        this.value = countryList[landingCountry];
                    }
                    this.selectionStart = this.selectionEnd = this.value.length;
                    this.focus();
                };
                phoneNumber.onmousedown = function (e) {
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
                    if (!isFinite(e.key) && e.keyCode !== 8) {
                        e.preventDefault();
                    }
                };
            }
        }
    }]);

    return Formater;
}();

var States = function () {
    function States() {
        _classCallCheck(this, States);
    }

    _createClass(States, null, [{
        key: 'getAll',
        value: function getAll() {
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
                "CAN": {
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
                "NOK": {
                    "AK": "Akershus",
                    "AA": "Aust-Agder",
                    "BU": "Buskerud",
                    "FI": "Finnmark",
                    "HE": "Hedmark",
                    "HO": "Hordaland",
                    "SJ": "Svalbard",
                    "MR": 'M\xF8re og Romsdal',
                    "NO": 'Nord-Tr\xF8ndelag',
                    "NT": "Nordland",
                    "OP": "Oppland",
                    "OS": "Oslo",
                    "RO": "Rogaland",
                    "SF": "Sogn og Fjordane",
                    "ST": 'S\xF8r-Tr\xF8ndelag',
                    "TE": "Telemark",
                    "TR": "Troms",
                    "VA": "Vest-Agder",
                    "VF": "Vestfold",
                    "OF": '\xD8stfold'
                },
                "FRA": {
                    "01": "Ain",
                    "02": "Aisne",
                    "03": "Allier",
                    "04": "Alpes-de-Haute-Provence",
                    "06": "Alpes-Maritimes",
                    "07": 'Ard\xE8che',
                    "08": "Ardennes",
                    "09": 'Ari\xE8ge',
                    "10": "Aube",
                    "11": "Aude",
                    "12": "Aveyron",
                    "67": "Bas-Rhin",
                    "13": 'Bouches-du-Rh\xF4ne',
                    "14": "Calvados",
                    "15": "Cantal",
                    "16": "Charente",
                    "17": "Charente-Maritime",
                    "18": "Cher",
                    "CP": "Clipperton",
                    "19": 'Corr\xE8ze',
                    "2A": "Corse-du-Sud",
                    "21": 'C\xF4te-d\'Or',
                    "22": 'C\xF4tes-d\'Armor',
                    "23": "Creuse",
                    "79": 'Deux-S\xE8vres',
                    "24": "Dordogne",
                    "25": "Doubs",
                    "26": 'Dr\xF4me',
                    "91": "Essonne",
                    "27": "Eure",
                    "28": "Eure-et-Loir",
                    "29": 'Finist\xE8re',
                    "30": "Gard",
                    "32": "Gers",
                    "33": "Gironde",
                    "68": "Haut-Rhin",
                    "2B": "Haute-Corse",
                    "31": "Haute-Garonne",
                    "43": "Haute-Loire",
                    "52": "Haute-Marne",
                    "70": 'Haute-Sa\xF4ne',
                    "74": "Haute-Savoie",
                    "87": "Haute-Vienne",
                    "05": "Hautes-Alpes",
                    "65": 'Hautes-Pyr\xE9n\xE9es',
                    "92": "Hauts-de-Seine",
                    "34": 'H\xE9rault',
                    "35": "Ille-et-Vilaine",
                    "36": "Indre",
                    "37": "Indre-et-Loire",
                    "38": 'Is\xE8re',
                    "39": "Jura",
                    "40": "Landes",
                    "41": "Loir-et-Cher",
                    "42": "Loire",
                    "44": "Loire-Atlantique",
                    "45": "Loiret",
                    "46": "Lot",
                    "47": "Lot-et-Garonne",
                    "48": 'Loz\xE8re',
                    "49": "Maine-et-Loire",
                    "50": "Manche",
                    "51": "Marne",
                    "53": "Mayenne",
                    "YT": "Mayotte",
                    "54": "Meurthe-et-Moselle",
                    "55": "Meuse",
                    "56": "Morbihan",
                    "57": "Moselle",
                    "58": 'Ni\xE8vre',
                    "59": "Nord",
                    "NC": 'Nouvelle-Cal\xE9donie',
                    "60": "Oise",
                    "61": "Orne",
                    "75": "Paris",
                    "62": "Pas-de-Calais",
                    "PF": 'Polyn\xE9sie fran\xE7aise',
                    "63": 'Puy-de-D\xF4me',
                    "64": 'Pyr\xE9n\xE9es-Atlantiques',
                    "66": 'Pyr\xE9n\xE9es-Orientales',
                    "69": 'Rh\xF4ne',
                    "BL": 'Saint-Barth\xE9lemy',
                    "MF": "Saint-Martin",
                    "PM": "Saint-Pierre-et-Miquelon",
                    "71": 'Sa\xF4ne-et-Loire',
                    "72": "Sarthe",
                    "73": "Savoie",
                    "77": "Seine-et-Marne",
                    "76": "Seine-Maritime",
                    "93": "Seine-Saint-Denis",
                    "80": "Somme",
                    "81": "Tarn",
                    "82": "Tarn-et-Garonne",
                    "TF": 'Terres Australes Fran\xE7aises',
                    "90": "Territoire de Belfort",
                    "95": 'Val-d\'Oise',
                    "94": "Val-de-Marne",
                    "83": "Var",
                    "84": "Vaucluse",
                    "85": 'Vend\xE9e',
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
                    'NT': 'Northern Territory'
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
            var options = this.getState(landingCountry);
            Object.keys(stateList).forEach(function (k) {
                options += '<option value="' + k + '">' + stateList[k] + '</option>';
            });
            selectState[0].innerHTML = options;
        }
    }, {
        key: 'getState',
        value: function getState(country) {
            var selectState = 'Select State';
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
    }]);

    return States;
}();

var Overlay = function () {
    function Overlay() {
        _classCallCheck(this, Overlay);
    }

    _createClass(Overlay, null, [{
        key: 'start',
        value: function start() {
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
        }
    }, {
        key: 'stop',
        value: function stop() {
            var overlay = document.getElementById('overlay');
            document.body.removeChild(overlay);
        }
    }]);

    return Overlay;
}();

var Cookie = function () {
    function Cookie() {
        _classCallCheck(this, Cookie);
    }

    _createClass(Cookie, null, [{
        key: 'get',
        value: function get(name) {
            var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
            return matches ? decodeURIComponent(matches[1]) : undefined;
        }
    }]);

    return Cookie;
}();

var Popup = function () {
    function Popup() {
        _classCallCheck(this, Popup);
    }

    _createClass(Popup, null, [{
        key: 'set',
        value: function set() {
            if (typeof Storage !== "undefined") {
                localStorage.setItem("popup", "visible");
            } else {
                document.cookie = "popup=visible; path=/;";
            }

            this.popUp();
        }
    }, {
        key: 'get',
        value: function get() {
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
    }, {
        key: 'popUp',
        value: function popUp() {
            var messages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

            var popup = document.createElement('div');
            var overlay = document.createElement('div');

            var countryList = {
                "USA": "We've encountered an error while processing your order. Please contact our customer service team at: <br><br>Email: <a href=\"mailto:" + customerEmail + "\" />" + customerEmail + "</a><br>Phone: <span>" + customerPhone + "</span>",
                "CA": "We've encountered an error while processing your order. Please contact our customer service team at: <br><br>Email: <a href=\"mailto:" + customerEmail + "\" />" + customerEmail + "</a><br>Phone: <span>" + customerPhone + "</span>",
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
    }]);

    return Popup;
}();

var Descriptors = function () {
    function Descriptors() {
        _classCallCheck(this, Descriptors);
    }

    _createClass(Descriptors, null, [{
        key: 'show',
        value: function show() {
            var params = {
                action: 'descriptor'
            };

            new Ajax("GET", 'sdk.php', params, function (response) {
                response = JSON.parse(response.responseText);
                if (response.status === "success") {
                    var descriptors = response.descriptors.join(' ');
                    document.getElementById('descriptors').innerHTML += descriptors;
                }
            });
        }
    }]);

    return Descriptors;
}();

var Error = function () {
    function Error() {
        _classCallCheck(this, Error);
    }

    _createClass(Error, null, [{
        key: 'set',
        value: function set(element) {
            element = document.getElementsByName(element)[0];
            element.style.border = '1px solid red';
        }
    }, {
        key: 'leadForm',
        value: function leadForm(element) {
            element.style.border = '1px solid red';

            var errorMassegeElement = element.nextElementSibling;

            if (errorMassegeElement) {
                element.nextElementSibling.style.visibility = "visible";
            }
        }
    }, {
        key: 'hideLead',
        value: function hideLead(element) {
            element.style.border = '1px solid #dfdfdf';

            var errorMassegeElement = element.nextElementSibling;

            if (errorMassegeElement) {
                errorMassegeElement.style.visibility = "hidden";
            }
        }
    }, {
        key: 'hideCheckoutForm',
        value: function hideCheckoutForm(form) {
            for (var index in form) {
                var element = document.getElementsByName(index)[0];
                if (index === "date") {
                    document.getElementsByName("cardMonth")[0].style.border = '1px solid #dfdfdf';
                    document.getElementsByName("cardYear")[0].style.border = '1px solid #dfdfdf';
                } else {
                    element.style.border = '1px solid #dfdfdf';
                }
            }
        }
    }]);

    return Error;
}();

var Import = function () {
    function Import(e) {
        _classCallCheck(this, Import);

        e.preventDefault();
        Overlay.start();
    }

    _createClass(Import, [{
        key: 'formToObject',
        value: function formToObject(form) {
            var params = {};
            var i = 0;
            while (i < form.length) {
                if (form[i].name !== "") params[form[i].name] = form[i].value;
                i++;
            }
            return params;
        }
    }, {
        key: 'queryServer',
        value: function queryServer(form, checkResult) {
            var orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;

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
    }], [{
        key: 'click',
        value: function click() {
            var params = {
                pageType: pageType,
                requestUri: location.href,
                action: 'click'
            };
            new Ajax("GET", 'sdk.php', params, function (response) {
                var respons = JSON.parse(response.responseText);
                if (respons['pixel'] !== undefined && respons['pixel'] !== false) {
                    var pixel = document.createElement('div');
                    pixel.innerHTML = respons['pixel'];
                    document.body.appendChild(pixel);
                }
            });
        }
    }]);

    return Import;
}();

var Lead = function () {
    function Lead() {
        _classCallCheck(this, Lead);

        this.params = document.querySelectorAll("input, select");
        this.form = this.getTestForm(this.params);
        this.validator = new Validator(this.form);

        this.validationEvents();
    }

    _createClass(Lead, [{
        key: 'getTestForm',
        value: function getTestForm(form) {
            var params = {
                "firstName": {
                    object: form[0],
                    type: "initial"
                },
                "lastName": {
                    object: form[1],
                    type: "initial"
                },
                "email": {
                    object: form[2],
                    type: "email"
                },
                "phoneNumber": {
                    object: form[3],
                    value: form[3].value.substr(1),
                    type: "phone"
                },
                "address": {
                    object: form[4],
                    type: "address"
                },
                "city": {
                    object: form[5],
                    type: "city"
                },
                "state": {
                    object: form[6],
                    type: "field"
                },
                "country": {
                    object: form[7],
                    type: "field"
                },
                "postalCode": {
                    object: form[8],
                    type: "postalCode"
                }
            };
            return params;
        }
    }, {
        key: 'submit',
        value: function submit(event) {
            var importLead = new Import(event);

            if (this.checkValidation()) {
                var form = importLead.formToObject(this.params);

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
                        } else {
                            Popup.set();
                        }
                    }
                });
            } else {
                Overlay.stop();
            }
        }
    }, {
        key: 'objectValidationCheck',
        value: function objectValidationCheck(validator, object, type, countryValue) {
            Error.hideLead(object);
            var answer = function answer() {
                var result = "";

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
    }, {
        key: 'validationEvents',
        value: function validationEvents() {
            var _this = this;

            if (this.validator.formTypes) {
                (function () {
                    var self = _this;
                    var countryValue = self.form["country"].object.value;

                    var _loop = function _loop(element) {
                        self.form[element].object.addEventListener("focusout", function () {
                            self.objectValidationCheck(self.validator, self.form[element].object, self.form[element].type, countryValue);
                        });
                    };

                    for (var element in self.form) {
                        _loop(element);
                    }
                })();
            }
        }
    }, {
        key: 'checkValidation',
        value: function checkValidation() {
            var errors = false;

            if (this.validator.formTypes) {
                var countryValue = this.form["country"].object.value;

                for (var element in this.form) {
                    var answer = this.objectValidationCheck(this.validator, this.form[element].object, this.form[element].type, countryValue);

                    if (!answer) {
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
    }]);

    return Lead;
}();

var Order = function (_Import) {
    _inherits(Order, _Import);

    function Order(e) {
        _classCallCheck(this, Order);

        var _this2 = _possibleConstructorReturn(this, (Order.__proto__ || Object.getPrototypeOf(Order)).call(this, e));

        var params = document.querySelectorAll("input[name='cardNumber'], input[name='cardSecurityCode'], select[name='cardMonth'], select[name='cardYear']");
        var form = _this2.getTestForm(params);

        if (_this2.validation(form)) {
            params = document.querySelectorAll("input, select");
            form = _get(Order.prototype.__proto__ || Object.getPrototypeOf(Order.prototype), 'formToObject', _this2).call(_this2, params);

            form['cardNumber'] = form['cardNumber'].split(" ").join("");
            form["action"] = "importOrder";
            form["requestUri"] = location.href;
            form["pageType"] = pageType;
            form['currency'] = 'USD';
            form["cookie_enabled"] = navigator.cookieEnabled;
            form["do_not_track"] = navigator.doNotTrack;

            _get(Order.prototype.__proto__ || Object.getPrototypeOf(Order.prototype), 'queryServer', _this2).call(_this2, form, function (response) {
                Overlay.stop();
                response = JSON.parse(response.responseText);
                if (response.status === "success") {
                    Unload.enable();
                    location.href = redirectTo;
                } else {
                    if (response.messages !== undefined) {
                        Popup.popUp(response.messages !== "" ? response.messages : " ");
                    } else {
                        Popup.set();
                    }
                }
            });
        } else {
            Overlay.stop();
        }
        return _this2;
    }

    _createClass(Order, [{
        key: 'getTestForm',
        value: function getTestForm(form) {
            var params = {
                "cardNumber": {
                    value: form[0].value.split(" ").join(""),
                    type: "card"
                },
                "cardSecurityCode": {
                    value: form[3].value,
                    type: "cvv"
                },
                "date": {
                    month: form[1].value,
                    year: form[2].value,
                    type: "date"
                }
            };
            return params;
        }
    }, {
        key: 'validation',
        value: function validation(form) {
            var validator = new Validator(form);
            var errors = false;

            if (validator.formTypes) {
                Error.hideCheckoutForm(form);

                var _loop2 = function _loop2(elem) {
                    var answer = function answer() {
                        var result = "";
                        if (elem === "date") {
                            result = validator.validate(elem, form[elem].month, form[elem].year);
                            return result;
                        }
                        result = validator.validate(form[elem].type, form[elem].value);
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
                };

                for (var elem in form) {
                    _loop2(elem);
                }
            } else {
                errors = true;
            }

            if (errors) {
                return false;
            }
            return true;
        }
    }]);

    return Order;
}(Import);

var Upsell = function (_Import2) {
    _inherits(Upsell, _Import2);

    function Upsell(e) {
        _classCallCheck(this, Upsell);

        var _this3 = _possibleConstructorReturn(this, (Upsell.__proto__ || Object.getPrototypeOf(Upsell)).call(this, e));

        var params = document.querySelectorAll("input");
        var form = _get(Upsell.prototype.__proto__ || Object.getPrototypeOf(Upsell.prototype), 'formToObject', _this3).call(_this3, params);

        form['action'] = 'importUpsell';
        form["requestUri"] = location.href;
        form["pageType"] = pageType;
        form["cookie_enabled"] = navigator.cookieEnabled;
        form["do_not_track"] = navigator.doNotTrack;

        _get(Upsell.prototype.__proto__ || Object.getPrototypeOf(Upsell.prototype), 'queryServer', _this3).call(_this3, form, function (response) {
            Overlay.stop();
            response = JSON.parse(response.responseText);
            if (response.status === "success") {
                Unload.enable();
                location.href = redirectTo;
            } else {
                if (response.messages !== undefined) {
                    Popup.popUp(response.messages !== "" ? response.messages : " ");
                } else {
                    Popup.set();
                }
            }
        });
        return _this3;
    }

    return Upsell;
}(Import);

var Construct = function () {
    function Construct() {
        _classCallCheck(this, Construct);

        Import.click();
        States.getAll();
        Popup.get();
        Formater.phone();
        if (pageType.indexOf('upsellPage') + 1) {
            pageType = "upsellPage";
        }
        this[pageType]();
    }

    _createClass(Construct, [{
        key: 'leadPage',
        value: function leadPage() {
            var form = document.getElementById('lead-form');
            if ((typeof form === 'undefined' ? 'undefined' : _typeof(form)) !== undefined && form !== null) {

                var importLead = new Lead();

                form.addEventListener('submit', function (e) {
                    importLead.submit(e);
                });
            }
        }
    }, {
        key: 'checkoutPage',
        value: function checkoutPage() {
            var form = document.getElementById('checkout-form');
            if ((typeof form === 'undefined' ? 'undefined' : _typeof(form)) !== undefined && form !== null) {
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
                window.onbeforeunload = function () {
                    return false;
                };
            }
        }
    }, {
        key: 'upsellPage',
        value: function upsellPage() {
            var form = document.getElementById('upsell');
            if ((typeof form === 'undefined' ? 'undefined' : _typeof(form)) !== undefined && form !== null) {
                document.getElementById('productName').value = productName;
                document.getElementById('productId').value = productId;
                document.getElementById('productAmount').value = productAmount;
                document.getElementById('productShipping').value = productShipping;
                form.addEventListener('submit', function (e) {
                    new Upsell(e);
                });
                var noThanksBtn = document.getElementById('no-upsell-link');
                noThanksBtn.addEventListener('click', function () {
                    Unload.enable();
                });
            }
        }
    }, {
        key: 'thankyouPage',
        value: function thankyouPage() {
            if (pageType !== undefined && pageType === 'thankyouPage') {
                Descriptors.show();
            }
        }
    }]);

    return Construct;
}();

window.onload = function () {
    new Construct();
};

var Validator = function () {
    function Validator(form) {
        _classCallCheck(this, Validator);

        this.formTypes = false;
        this.regularExpression = {
            "initial": /^[A-zÀ-ÿA-åА-я.\-']{3,32}$/,
            "email": /^([a-z0-9!#$%&'*+\-/=?^_`{|}~][.]{0,1}){1,63}[a-z0-9!#$%&'*+\-/=?^_`{|}~]@[a-z0-9][a-z0-9.\-]{1,63}[a-z0-9]\.[a-z]{2,4}$/i,
            "phone": /^[\+0-9]{8,15}$/,
            "address": /^[0-9]{0,127}([A-zÀ-ÿA-åА-я#.,;:"'°/\-]+[0-9]*[\s]{0,1}){3,127}[0-9A-zÀ-ÿA-åА-я#.,;:"'°]$/,
            "city": /^[A-zÀ-ÿA-åА-я]([A-zÀ-ÿA-åА-я/\-\)\(.\"\'][\s]{0,1}){1,126}[A-zÀ-ÿA-åА-я]$/,
            "cvv": /^[0-9]{3,4}$/,
            "postalCode": {
                "US": /^\d{5}$|^\d{5}-\d{4}$/,
                "CA": /^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/,
                "FR": /^[0-9]{5}$/,
                "AU": /^[0-9]{4}$/
            }
        };
        var types = ["initial", "email", "phone", "address", "city", "field", "postalCode", "cvv", "card", "date"];

        for (var elem in form) {
            var errors = true;

            for (var i = 0; i < types.length; i++) {
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

    _createClass(Validator, [{
        key: 'validate',
        value: function validate(type, value1, value2) {
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
    }, {
        key: 'field',
        value: function field(value) {
            if (value.trim().length === 0) {
                return false;
            }
            return true;
        }
    }, {
        key: 'postalCode',
        value: function postalCode(value, countryCode) {
            if (["US", "CA", "FR", "AU"].indexOf(countryCode) >= 0) {
                return this.regularExpression["postalCode"][countryCode].test(value);
            } else {
                return true;
            }
        }
    }, {
        key: 'card',
        value: function card(value) {
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
                    arr.push(n);
                }
            }
            var summ = arr.reduce(function (a, b) {
                return a + b;
            });
            return Boolean(!(summ % 10));
        }
    }, {
        key: 'date',
        value: function date(month, year) {
            var date = new Date();
            if (month <= ("0" + (date.getMonth() + 1)).slice(-2) && year <= date.getFullYear()) {
                return false;
            }
            return true;
        }
    }]);

    return Validator;
}();