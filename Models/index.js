

module.exports = function (mongoose) {

  let Schema = mongoose.Schema;
  let models = {};

  let Admins = require('./admins')(Schema);
  let Parent = require('./parents')(Schema);
  let Child = require('./children')(Schema);
  let Room = require('./rooms')(Schema);

// Associating Models with Schemas

  models.Admins = mongoose.model('Admins', Admins);
  models.Parent = mongoose.model('Parent', Parent);
  models.Child = mongoose.model('Child', Child);
  models.Room = mongoose.model('Room', Room);

  return models;

};
