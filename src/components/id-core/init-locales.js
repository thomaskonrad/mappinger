var retrieveJSON = function(url, successHandler, errorHandler) {
    var xhr = typeof XMLHttpRequest != 'undefined'
        ? new XMLHttpRequest()
        : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('get', url, true);
    xhr.onreadystatechange = function() {
        var status;
        var data;
        // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
        if (xhr.readyState == 4) { // `DONE`
            status = xhr.status;
            if (status == 200) {
                data = JSON.parse(xhr.responseText);
                successHandler && successHandler(data);
            } else {
                errorHandler && errorHandler(status);
            }
        }
    };
    xhr.send();
};

var idCorePath = 'components/id-core/';

window.locale = { _current: 'en' };

window.locale.current = function(_) {
    if (!arguments.length) return locale._current;
    if (locale[_] !== undefined) locale._current = _;
    else if (locale[_.split('-')[0]]) locale._current = _.split('-')[0];
    return locale;
};

// Get browser locale.
var browserLocale = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage || 'en-US');

retrieveJSON(idCorePath + 'locales.json', function(data) {
    iD.data.locales = data;

    if (browserLocale && browserLocale !== 'en' && iD.data.locales.indexOf(browserLocale) !== -1) {
        localePath = idCorePath + 'locales/' + browserLocale + '.json';

        retrieveJSON(localePath, function(data) {
            window.locale[browserLocale] = data;
            window.locale.current(browserLocale);
        }, function(status) {
            // Locale could not be loaded
        });
    } else {
        // Locale could not be loaded
    }

}, function(status) {

});
