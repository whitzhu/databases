var db = require('../db');
var clientSide = {
  username: 'TestName',
  message: 'TEST MESSAGE',
  room: 'lobby',
  time: '12:00pm'
};

var message = {
  'id_Users_Table': 1,
  'Message': 'HElLO',
  'id_Room_Table': 1,
  'Time': '2017-03-01 12:00:00'
};

var results = [];

// SELECT LAST_INSERT_ID() // get the last ID# for username



module.exports = {
  messages: {
    get: function (cb) { // a function which produces all the messages
      dbConnection.query(`SELECT UT.User_Name, MT.Message, MT.Time, RT.Room_Name FROM Msg_Table MT INNER JOIN Users_Table UT
                          ON (MT.id_Users_Table = UT.id) INNER JOIN Room_Table RT
                          ON (MT.id_Room_Table = RT.ID) LIMIT 20`, 
      function(err, rows) {
        if (err) {
          throw err;
        } else {
          // console.log(`Data from database ${rows[1].User_Name} ${rows[0].Message} ${rows[1].Time} ${rows[0].Room_Name}`);
          rows.forEach( function(record) {
            var clientSide = {};
            clientSide.username = record.User_Name;
            clientSide.room = record.Room_Name;
            clientSide.message = record.Message;
            clientSide.time = record.Time;

            results.push(clientSide);
          });
          cb(results);
        }
      });
    },
      //TODO: process data that we get from DB
    post: function (rawMessage) {
      //check if room exist in DB already
      var postMessage = {}; 
      postMessage.id_Users_Table = 1;
      // postMessage.id_Room_Table = 1;
      postMessage.Message = rawMessage.text;
      postMessage.Time = '2017-03-01 12:00:00';

      dbConnection.query(`SELECT RT.id FROM Room_Table RT WHERE RT.Room_Name = '${rawMessage.roomname}'`, function (err, rows) {
        if ( err ) { 
          console.log('error thrown');
          throw err; 
        } else if (rows[0] === undefined) {
          console.log('have no lobby');
          dbConnection.query(`INSERT INTO Room_Table (id,Room_Name) VALUES (null, '${rawMessage.roomname}')`, function(err, row) {
            postMessage.id_Room_Table = row.insertId;
          });
        } else {
           postMessage['id_Room_Table'] = rows[0].id;
           console.log('we found roomid!', postMessage.id_Room_Table);
        };
      });

      dbConnection.query(`INSERT INTO Msg_Table SET ? `, postMessage, function(err, row) {
        console.log("was inserted");
      });

      //userid assume we got it stored

      //post message to database using roomid and userid

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
    
    },
    post: function () {
      console.log('post');
      dbConnection.query(`INSERT INTO Users_Table SET ? `, {'id': null, 'User_Name': clientSide.username}, function(err, row) {
        message.id_Users_Table = row.insertId;
      });
    }
  }
};

