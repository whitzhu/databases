var db = require('../db');

module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    post: function () {

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

      dbConnection.query(`SELECT UT.User_Name, MT.Message, MT.Time, RT.Room_Name FROM Msg_Table MT INNER JOIN Users_Table UT
                          ON (MT.id_Users_Table = UT.id) INNER JOIN Room_Table RT
                          ON (MT.id_Room_Table = RT.ID) `, 
      function(err, rows) {
        if (err) {
          throw err;
        } else {
          console.log(`Data from database ${rows[1].User_Name} ${rows[0].Message} ${rows[1].Time} ${rows[0].Room_Name}`);
        }
      });
    },
    post: function () {}
  }
};

