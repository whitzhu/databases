var models = require('../models');
var express = require('express');

var storage = {results: []};

module.exports = {
  messages: {
    get: function (req, res) {
      models.users.get();
      res.end(JSON.stringify(storage));
    }, // a function which handles a get request for all messages
    post: function (req, res) { 
      var messages = req.body;
      storage.results.push(messages);
      res.end(JSON.stringify(messages));
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      var messages = req.body;
      res.end(JSON.stringify(messages));
    }
  }
};

