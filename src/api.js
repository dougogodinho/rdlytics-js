'use strict';

var please = require('please-ajax');

var API_HOST = 'https://rdlytics.herokuapp.com/';

module.exports = {
    get: function (url) {
        return please.get(API_HOST + url, {promise: true})
    },
    delete: function (url) {
        return please.delete(API_HOST + url, {promise: true})
    },
    post: function (url, data) {
        return please.post(API_HOST + url, objectToQueryString(data), {promise: true})
    },
    put: function (url, data) {
        return please.put(API_HOST + url, objectToQueryString(data), {promise: true})
    }
}


// FROM https://gist.github.com/dgs700/4677933
function objectToQueryString(a) {
    var prefix, s, add, name, r20, output;
    s = [];
    r20 = /%20/g;
    add = function (key, value) {
        // If value is a function, invoke it and return its value
        value = ( typeof value == 'function' ) ? value() : ( value == null ? "" : value );
        s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
    };
    if (a instanceof Array) {
        for (name in a) {
            add(name, a[name]);
        }
    } else {
        for (prefix in a) {
            buildParams(prefix, a[prefix], add);
        }
    }
    output = s.join("&").replace(r20, "+");
    return output;
}

function buildParams(prefix, obj, add) {
    var name, i, l, rbracket;
    rbracket = /\[\]$/;
    if (obj instanceof Array) {
        for (i = 0, l = obj.length; i < l; i++) {
            if (rbracket.test(prefix)) {
                add(prefix, obj[i]);
            } else {
                buildParams(prefix + "[" + ( typeof obj[i] === "object" ? i : "" ) + "]", obj[i], add);
            }
        }
    } else if (typeof obj == "object") {
        // Serialize object item.
        for (name in obj) {
            buildParams(prefix + "[" + name + "]", obj[name], add);
        }
    } else {
        // Serialize scalar item.
        add(prefix, obj);
    }
}