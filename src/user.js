'use strict';

var api = require('./api');

module.exports = User;

function User(user_id) {

    this.id = user_id;

    this.API_HOST = 'https://rdlytics.herokuapp.com/';

    this.interact = function (location) {

        if (!location) {
            location = document.getElementsByTagName('title')[0].innerHTML;
        }

        return api.post('users/' + this.id + '/interactions', {interaction: {location: location}});
    }
}