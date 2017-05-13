

module.exports = function (mongoose) {

  let Schema = mongoose.Schema;
  let models = {};

  let Admins = require('./admins')(Schema);
  let Parent = require('./parents')(Schema);
  let Child = require('./children')(Schema);

// Associating Models with Schemas

  models.Admins = mongoose.model('Admins', Admins);
  models.Parent = mongoose.model('Parent', Parent);
  models.Child = mongoose.model('Child', Child);

  return models;

};
