const {CANNED_MESSAGES, MOVE_KEY} = require("./constants");

// Stores the active TCP connection object.
let connection;

// setup interface to handle user input from stdin
const setupInput = function(conn) {
  connection = conn;
  
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();

  const handleUserInput = function(connection) {
    if (connection === '\u0003') {
      console.log("Thank you for playing!")
      process.exit();
    }

    // Send the string "Move: __" as data to the server via the conn object.
    for (let key in MOVE_KEY) {
      if (connection === key) {
        conn.write(MOVE_KEY[key]);
      }
    }
    
    // Logic for canned messages
    for (let message in CANNED_MESSAGES) {
      if (connection === message) {
        setTimeout(() => {
          conn.write(CANNED_MESSAGES[message]);
        }, 1000);
      }
    }
  };
  
  stdin.on("data", handleUserInput);

  return stdin;
};

module.exports = {setupInput};