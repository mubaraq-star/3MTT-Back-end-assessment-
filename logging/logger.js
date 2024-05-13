

// const winston = require('winston')

// const options = {
//     file: {
//         level: 'info',
//         filename: './logs/app.log',
//         handleExceptions: true,
//         json: true,
//         maxsize: 5242880, // 5MB
//         maxFiles: 5,
//         colorize: false,
//     },
// };


// const logger = winston.createLogger({
//     levels: winston.config.npm.levels,
//     transports: [
//         new winston.transports.File(options.file),
//         // new winston.transports.Console(options.console)
//     ],
//     exitOnError: false
// })
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

module.exports = logger
