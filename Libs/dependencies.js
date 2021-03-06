/**
 * Created by Rohail Najam on 2/5/2017.
 */

module.exports = function (app, express,config) {

  const mongoose = require('mongoose'),
    dbConnection  = require('../Configs/mongo')(config, mongoose),
    models  = require('../models/index')(mongoose);

  return {
    app : app,
    bcrypt : require('bcrypt'),
    bodyParser :require('body-parser'),
    config : config,
    cors : require('cors'),
    dbConnection : dbConnection,
    enums : require('../Configs/enums'),
    express : express,
    fs : require('fs-extra'),
    joi : require('joi'),
    jwt : require('jsonwebtoken'),
    jwtWhiteSheet : require('../Configs/jwtwhitesheet'),
    messages : require('../Configs/messages'),
    models : models,
    mongoose : mongoose,
    morgan :require('morgan'),
    path : require('path'),

  }

};