const process = require("process");
const bunyan = require("bunyan");

const logger = bunyan.createLogger({
  name: "pindie",
  streams: [
    {
      level: "debug",
      stream: process.stdout,
    },
    {
      level: "info",
      type: "rotating-file",
      path: "./logs/pindie.log",
      period: "1d",
      count: 14,
    },
  ],
});

module.exports = { logger };
