
const app = require('./server/server');

const port = process.env.PORT || 9001;
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

process.on('uncaughtException', (err) => {
  console.error(` ---- Caught exception in process level -----: \n${err}`);
});

module.exports = server;
