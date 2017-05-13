

module.exports = function (mongoose) {

  let Schema = mongoose.Schema;
  let models = {};

  let Admins = require('./admins')(Schema);
  let Parent = require('./parents')(Schema);
  let Child = require('./children')(Schema);
  let Room = require('./rooms')(Schema);
  let ActivityLog = require('./activitylog')(Schema);
  let TimeTable = require('./timetable')(Schema);

// Associating Models with Schemas

  models.Admins = mongoose.model('Admins', Admins);
  models.Parent = mongoose.model('Parent', Parent);
  models.Child = mongoose.model('Child', Child);
  models.Room = mongoose.model('Room', Room);
  models.ActivityLog = mongoose.model('ActivityLog', ActivityLog);
  models.TimeTable = mongoose.model('TimeTable', TimeTable);

  return models;

};
