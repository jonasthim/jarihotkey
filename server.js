//Jaris fnaskhörna

const robot = require("robotjs");
const { v4: uuidv4 } = require('uuid');
const express = require("express");
const app = express();



app.use(express.json());

function triggerKeyEvent(key, modifier, duration, uuid) {
  /*
  keyTap(key, [modifier])
  Press a single key.

  Arguments

  Argument    Description                                                              Default
  key         See keys.                                                                None
  modified    String or an array. Accepts alt, command (win), control, and shift.      None

  */

  robot.keyTap(key, modifier);
    console.log(uuid+" | Start of toggle: Pressed "+modifier.join(" + ")+" + "+key+" waiting another "+duration+" milliseconds for next keypress")
  setTimeout(function() {
      robot.keyTap(key, modifier)
      console.log(uuid+" | End of toggle: Pressed "+modifier.join(" + ")+" + "+key+"")
  }, duration);
 }

app.post('/trigger', function(request, response) {

  /* Expected payload

  {
      "key": "2",
      "modifier": ["control","alt"],
      "duration": 5000
  }

  */

  /* Keep track of request with uuid */
  var uuid = uuidv4();

  /* Start remove if Kruiz Control support payload */
  var key = "1"
  var modifier = ["control","shift","alt"]
  var duration = 1000
  /* End remove if Kruiz Control support payload */

  if(request.body.hasOwnProperty("key")) {
    var key = request.body.key;
  } else {
    console.log(uuid+" | No key sent with payload, please check incoming webhook");
  }

  if(request.body.hasOwnProperty("modifier")) {
    var modifier = request.body.modifier;
  } else {
    console.log(uuid+" | No modifier sent with payload, please check incoming webhook");
  }

  if(request.body.hasOwnProperty("duration")) {
    var duration = request.body.duration;
  } else {
    console.log(uuid+" | No duration sent with payload, please check incoming webhook");
  }
  if(typeof key !== "undefined" && typeof modifier !== "undefined" && typeof duration !== "undefined") {
    response.writeHead(200, {"Content-Type": "application/json"})
    response.end('OK')
    triggerKeyEvent(key,modifier,duration,uuid)
  } else {
    console.log(uuid+" | Returning 400 to client")
    response.writeHead(400, {"Content-Type": "application/json"})
    response.end('OK')
  }

})

port = 3000
app.listen(port)
console.log(`Listening at http://localhost:${port}`)