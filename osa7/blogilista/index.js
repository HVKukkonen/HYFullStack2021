// TITLE: entry point for the app, specified during npm init
// STATUS: COMPLETE

const http = require('http');
const app = require('./app'); // varsinainen Express-sovellus
const config = require('./utils/config');
const logger = require('./utils/logger');

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
