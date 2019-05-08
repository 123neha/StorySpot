const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const expressValidator = require('express-validator');
const cors = require('cors');
const config = require('./config');

const app = express();

const url = `mongodb://localhost/${config}`;
const options = { promiseLibrary: global.Promise, useNewUrlParser: true };
mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('connected', function () {
  console.log(`Mongoose connected to: ${url}`);
});

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${url}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressValidator());

app.use(cors({
  credentials: true,
  origin: [true]
}));

app.get('/', (req, res) => res.json({ message: "Welcome to Story Spot APIs" }));
app.use('/v1/api', routes);

module.exports = app;
