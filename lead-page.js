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

function importLead(e) {
    e.preventDefault();
    Overlay.start();
    var params = this.querySelectorAll('input, select');
    var form = formToObject(params);

    form["action"] = "importLead";
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
    form['redirect'] = redirectTo;

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

function importOrder(e) {
    e.preventDefault();
    var params = this.querySelectorAll('input, select');
    var form = formToObject(params);
    if (cardValidate(form["cardNumber"])) {
        document.querySelector('input[name=cardNumber]').removeAttribute("style");
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
                    setPopup();
                }
            });
        });
    } else {
        document.querySelector('input[name=cardNumber]').setAttribute("style", "border: 1px solid red;");
    }
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
        }
    };

    var selectState = document.getElementsByName('state');

    if (selectState[0] === undefined || selectState[0] === null) {
        return;
    }

    var stateList = states[country];
    var options = '<option>Select State</option>';
    Object.keys(stateList).forEach(function (k) {
        options += '<option value="' + k + '">' + stateList[k] + '</option>';
    });
    selectState[0].innerHTML = options;

}

function cardValidate(value) {
    var arr = [],
        card_number = value.toString();

    if (card_number.length < 13) {
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

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}


function popUp() {
    var popup = document.createElement('div');
    var overlay = document.createElement('div');
    overlay.setAttribute('class', 'overlay');
    popup.setAttribute('class', 'modal');
    popup.innerHTML = "We've encountered an error while processing your order. Please contact our customer service team at: <br> <br>Email: <a href=\"mailto:customer_support@" + location.host + "\" />customer_support@" + location.host + "</a><br>Phone: <span>1-877-886-1776</span>";
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

};

