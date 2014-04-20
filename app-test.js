module.exports = function () {
  var express = require('express');
  
  var iniparser = require('iniparser');
  var config = iniparser.parseSync('./config/config.ini');
  
  var path = require('path');

  app = express();

  var mysql      = require('mysql');
  connection = mysql.createConnection({
    host     : config.host,
    user     : config.user,
    password : config.password,
    database : "cg_test"
  });
  connection.connect();

  // all environments
  app.set('port', process.env.PORT || config.port);
  // app.set('views', path.join(__dirname, 'views'));
  // app.set('view engine', 'jade');
  app.use(express.json());
  app.use(express.cookieParser('S3CR3T'));
  app.use(express.bodyParser());
  app.use(express.urlencoded());
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

  // development only
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }
  crypto = require('crypto');
  var routes = require('./routes/index')();
  return app;
};
