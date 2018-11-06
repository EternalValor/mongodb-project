const express = require('express');
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://oth:oth123@ds231242.mlab.com:31242/mongodb-project', { useNewUrlParser: true });

app.use(bodyParser.json());

routes(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message});
});

module.exports = app;