var models = require('../models');
var express = require('express');

var storage = {};

var dummyUser = {username: 'Raffy'};

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(messages) {
        storage.results = messages;
        res.end(JSON.stringify(storage));
      });
    }, 
    post: function (req, res) { 
      var messages = req.body;
      models.users.post(dummyUser);
      models.messages.post(messages);
      res.end(JSON.stringify(messages));
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      var username = req.body;
      models.users.post(username);
      res.end(JSON.stringify(username));
    }
  }
};

