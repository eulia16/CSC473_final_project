const express = require("express");
const { SerialPort } = require('serialport');
const app = express();

app.use(express.json());

// Correcting the setup for SerialPort initialization
const port = new SerialPort({ path: 'COM3', baudRate: 9600 }, (err) => {
  if (err) {
    console.log('Error on serial port: ', err.message);
    return;
  }
});

function writeToArduino(message) {
  port.write(message, (err) => {
    if (err) {
      console.log('Error on write: ', err.message);
      return;
    }
    console.log('message written', message);
  });
}

app.post("/play", (req, res) => {
  console.log("Play command received");
  writeToArduino('1\n');
  res.status(200).json({ message: "Play command executed" });
});

app.post("/pause", (req, res) => {
  console.log("Pause command received");
  writeToArduino('3\n');
  res.status(200).json({ message: "Pause command executed" });
});

app.post("/stop", (req, res) => {
  console.log("Stop command received");
  writeToArduino('2\n');
  res.status(200).json({ message: "Stop command executed" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
