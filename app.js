const express = require('express');
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/ucdBiblio', { useNewUrlParser: true });

app.use(bodyParser.json());

routes(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message});
});

module.exports = app;