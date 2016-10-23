'use strict';

require("babel-polyfill");

var storage = window.localStorage;
var api = require('./src/api');
var User = require('./src/user');

window.rdlytics = new rdlytics();
module.exports = rdlytics;

function rdlytics() {

    var $this = this;

    var STORAGE_KEY = 'rd-user-12ddd';

    var user = null;

    this.init = function () {

        this.getUser().then(function (user) {

            user.interact();

            return user;
        });
    }

    this.getUser = function () {
        return new Promise(function (resolve, reject) {
            try {
                if (user) {
                    return resolve(user);
                }
                getUserId().then(function (user_id) {
                    resolve(user = new User(user_id));
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    function getUserId() {

        return new Promise(function (resolve, reject) {

            try {
                // try to get from localStorage...
                var user_id = storage.getItem(STORAGE_KEY);
                if (user_id) {
                    return resolve(user_id);
                }
                // if there's no user on local storage, get from API
                api.post('users', {user: {}}).then(function (response) {
                    response = JSON.parse(response);
                    storage.setItem(STORAGE_KEY, response.id);
                    resolve(response.id);
                });
            } catch (e) {
                reject(e)
            }
        });
    }
};