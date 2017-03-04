// YOUR CODE HERE:
var app = {
  message: {
    username: null,
    text: null,
    roomname: null
  },
  friends: [],
  rooms: [],
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages'
};

$(document).ready(function() {
  app.init = function() {

    $('body').on('click', '.username', function(e) {
      e.preventDefault();
      app.handleUsernameClick(e);
    });
    $('#usernameform').on('click', '.usersubmit', function(e) {
      e.preventDefault();
      var userText = $('.usertextbox').val();
      app.message.username = userText;
      app.sendUsername(userText);
      $('.usertextbox').val('');
    });
    $('form').on('click', '.msgsubmit', function(e) {
      e.preventDefault();
      app.handleSubmit();
      $('.textbox').val('');
    });
    $('.newroom').on('click', function() {
      var roomName = prompt('What is the new name of your room?');
      app.rooms.push(roomName);
      app.renderRoom(roomName);
      $('#roomSelect').val(roomName);
    });

  };
  app.init();
  app.fetch();
  setInterval(app.fetch.bind(app), 2000);
});

app.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://127.0.0.1:3000/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};
app.sendUsername = function(userName) {
  console.log('in sendUserName');
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://127.0.0.1:3000/classes/users',
    type: 'POST',
    data: JSON.stringify({'username': userName}),
    contentType: 'application/json',
    success: function (data) {
      console.log('username sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('send username fail', data);
    }
  });
};
app.handleUsernameClick = function(e) { 
  var newFriend = $(e.target).text();
  app.friends.push(newFriend);
};

app.handleSubmit = function() {
  //configure the message
  app.message.text = $('.textbox').val();
  // app.message.username = 'Raffy'; //window.location.search.slice(10);
  app.message.roomname = $('#roomSelect option:selected').text();
  app.send(app.message);

};
var newMessages = [];
app.fetch = function() {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://127.0.0.1:3000/classes/messages',
    type: 'GET',
    // data: {},
    contentType: 'application/json',
    success: function (rawData) {
      var data = JSON.parse(rawData);
      console.log(data);
      newMessages = [];
      data.results.forEach(function(value) {
        newMessages.push(value);
      });
      // $('#chats').children('.message').remove();
      // app.clearMessages();
      newMessages.forEach(function(value) {
        if (value.room === $('#roomSelect option:selected').text()) {
          app.renderMessage(value);
        }
      });

      data.results.forEach(function(value) {
        var roomname = _escape(value.room);
        if (app.rooms.indexOf(value.room) === -1) {
          app.rooms.push(value.room);
          app.renderRoom(value.room);
        }
      });
      
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive message', data);
    }
  });
};

app.clearMessages = function() {
  $('#chats').empty();
  console.log('clear message was invoked');
};

var htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;'
};
var htmlEscaper = /[&<>"'\/]/g;

var _escape = function(string) {
  return ('' + string).replace(htmlEscaper, function(match) {
    return htmlEscapes[match];
  });
};

app.renderMessage = function(message) {
  var username = _escape(message.username);
  var text = _escape(message.message);

  if (app.friends.indexOf(message.username) > -1) {
    $('#chats').append(`<section class="message"><h3><a class="username" href="#">${username}</a></h3> <div><b>${text}</b></div></section>`);
  } else {
    $('#chats').append(`<section class="message"><h3><a href="#" class="username">${username}</a></h3> <div>${text}</div></section>`);
  }
};

app.renderRoom = function(roomname) {
  $('#roomSelect').prepend(`<option>${roomname}</option>`);
};

