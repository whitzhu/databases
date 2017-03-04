var db = require('../db');
// var message = {
//   id_Users_Table: ....,
//   Message: ......,
//   id_Room_Table: ....
// }

// SELECT LAST_INSERT_ID() // get the last ID# for username



module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
      // dbConnection.query(`SELECT UT.User_Name, MT.Message, MT.Time, RT.Room_Name FROM Msg_Table MT INNER JOIN Users_Table UT
      //                     ON (MT.id_Users_Table = UT.id) INNER JOIN Room_Table RT
      //                     ON (MT.id_Room_Table = RT.ID) `, 
      // function(err, rows) {
      //   if (err) {
      //     throw err;
      //   } else {
      //     console.log(`Data from database ${rows[1].User_Name} ${rows[0].Message} ${rows[1].Time} ${rows[0].Room_Name}`);
      //   }
      // });

      //TODO: process data that we get from DB
    post: function () {
      var roomname = 'lobby';
      
      //check if room exist in DB already 
      var roomid = dbConnection.query(`SELECT RT.Room_Name FROM Room_Table RT WHERE RT.Room_Name = ${roomname}`, function (err, rows) {
        if ( err ) { throw err; }
        //if exist pull id 
        // console.log(rows);
      });

      //userid assume we got it stored

      //post message to database using roomid and userid

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
      console.log('in the model');
      // SELECT * FROM `users_table`;
      // dbConnection.query('SELECT * FROM Users_Table', function(err, rows) {
      //   if (err) { 
      //     throw err; 
      //   } else { 
      //     console.log(`Data from database ${rows[0].User_Name}`);
      //   }
      // });
    },
    post: function () {}
  }
};

