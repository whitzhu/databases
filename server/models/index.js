var db = require('../db');

var currentUserId;
var results = [];

module.exports = {
  messages: {
    get: function (cb) { 
      dbConnection.query(`SELECT UT.User_Name, MT.Message, MT.Time, RT.Room_Name FROM Msg_Table MT INNER JOIN Users_Table UT
                          ON (MT.id_Users_Table = UT.id) INNER JOIN Room_Table RT
                          ON (MT.id_Room_Table = RT.ID) ORDER BY Time DESC LIMIT 20`, 
      function(err, rows) {
        if (err) {
          throw err;
        } else {
          rows.forEach( function(record) {
            var clientSide = {};
            clientSide.username = record.User_Name;
            clientSide.room = record.Room_Name;
            clientSide.message = record.Message;
            clientSide.time = record.Time;
            results = [];
            results.push(clientSide);
          });
          cb(results);
        }
      });
    },
    post: function (rawMessage) {
      var postMessage = {}; 
      module.exports.users.get(rawMessage, function(userid) {
        postMessage.id_Users_Table = userid;
      });
      postMessage.Message = rawMessage.text;
      postMessage.Time = '2017-03-01 12:00:00';

      dbConnection.query(`SELECT RT.id FROM Room_Table RT WHERE RT.Room_Name = '${rawMessage.roomname}'`, function (err, rows) {
        if ( err ) { 
          throw err; 
        } else if (rows[0] === undefined) {
          dbConnection.query(`INSERT INTO Room_Table (id,Room_Name) VALUES (null, '${rawMessage.roomname}')`, function(err, row) {
            postMessage.id_Room_Table = row.insertId;
          });
        } else {
            postMessage['id_Room_Table'] = rows[0].id;
        }
        dbConnection.query(`INSERT INTO Msg_Table SET ? `, postMessage, function(err, row) {
        });
      });
    } 
  },

  users: {
    // Ditto as above.
    get: function (rawMessage, cb) {
      dbConnection.query(`SELECT UT.id FROM Users_Table UT WHERE UT.User_Name = '${rawMessage.username}'`, function (err, rows) {
        if ( err ) { 
          throw err; 
        }
        cb(rows[0].id);
      });
    },
    post: function (rawUser) {
      dbConnection.query(`SELECT UT.id FROM Users_Table UT WHERE UT.User_Name = '${rawUser.username}'`, function (err, rows) {
        if ( err ) { 
          throw err; 
        } else if (rows[0] === undefined) {
          dbConnection.query(`INSERT INTO Users_Table (id,User_Name) VALUES (null, '${rawUser.username}')`, function(err, row) {
            currentUserId = row.insertId;
          });
        } else {
            currentUserId = rows[0].id;
        }
      });
    }
  }
};

