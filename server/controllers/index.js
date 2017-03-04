var models = require('../models');
var express = require('express');

var storage = {};

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(messages) {
        storage.results = messages;
        res.end(JSON.stringify(storage));
      });
      //models.users.get(1, function(data) {
        // console.log(data);
      // });
    }, // a function which handles a get request for all messages
    post: function (req, res) { 
      //models.messages.post();
      var messages = req.body;
      console.log(messages);
      //storage.results.push(messages);
      models.messages.post(messages);
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

