#!/usr/bin/env node

var path = require('path');
var util = require('util');

var _ = require('underscore');
var express = require('express');
var Sequelize = require("sequelize");

var app = express();

var sequelize = new Sequelize('calory-counter', 'malte', '', {
  port: 5432,
  dialect: 'postgres'
});

var Calory = sequelize.define('Calory', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product: Sequelize.STRING,
  count: Sequelize.INTEGER
});

sequelize.sync();

app.use(express.bodyParser());
app.use(function(req, res, next) {
  _.bindAll(res, 'send');
  next();
});

app.use(app.router);
app.use(express.static(path.join(__dirname)));

app.get('/', function(req, res) {
  res.sendfile(path.join(__dirname, 'index-async.html'));
});

app.get('/calories', function(req, res, next) {
  Calory.all().success(res.send).error(next);
});
app.post('/calories', function(req, res, next) {
  Calory.create(req.body).success(res.send).error(next);
});
app.del('/calories/:calory', function(req, res, next) {
  Calory.find(parseInt(req.params.calory)).success(function(calory) {
    calory.destroy().success(res.send).error(next);
  }).error(next);
});

app.listen(8000);