//Jaris fnaskhörna

const robot = require("robotjs");

const express = require("express");
const app = express();



app.use(express.json({
  limit: "50mb"
}));

/* START: CREATE NEW BLOCK FOR EACH NEW TRIGGER */
app.post('/facefuck', function(request, response) {
  /*
  keyTap(key, [modifier])
  Press a single key.

  Arguments

  Argument    Description                                                              Default
  key         See keys.                                                                None
  modified    String or an array. Accepts alt, command (win), control, and shift.      None

  */
  robot.keyTap("1",["control","shift","alt"]);
  console.log("facefuck")
  response.writeHead(200, {'Content-Type': 'application/json'})
  response.end('OK')
})
/* END: CREATE NEW BLOCK FOR EACH NEW TRIGGER */


port = 3000
app.listen(port)
console.log(`Listening at http://localhost:${port}`)