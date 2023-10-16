const net = require("net");
const {IP, PORT, CONNECT_MESSAGE, EXIT_MESSAGE, USERNAME} = require("./constants");

// establishes a connection with the game server
const connect = function() {
  const conn = net.createConnection({
    host: IP,
    port: PORT
  });
  
  conn.on("connect", () => {
    console.log(CONNECT_MESSAGE);
    conn.write(`Name: ${USERNAME}`);
  });

  conn.on("data", () => {
    console.log(EXIT_MESSAGE);
    process.exit();
  });

  // interpret incoming data as text
  conn.setEncoding("utf8");

  return conn;
};

module.exports = {connect};