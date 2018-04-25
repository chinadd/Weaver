var mongoose = require('mongoose');
var eventSchema = require("./event.schema.server");
var eventModel = mongoose.model("EventModel", eventSchema);

eventModel.createEventForUser = createEventForUser;
eventModel.findPostEventsByUser = findPostEventsByUser;
// eventModel.findGoingEventsByUser = findGoingEventsByUser;
// eventModel.findSavedEventsByUser = findSEventsByUser;
eventModel.findEventById = findEventById;
eventModel.updateEvent = updateEvent;
eventModel.deleteEvent = deleteEvent;
eventModel.findAllEvents = findAllEvents;
eventModel.queryAllEvents = queryAllEvents;

module.exports = eventModel;

function createEventForUser(userId, event) {
  event['creator'] = userId;
  console.log('mongo' + JSON.stringify(event));
  return eventModel.create(event);
}

function findEventById(eventId) {
  return eventModel.findOne({_id:eventId});
}

function findPostEventsByUser(userId) {
  return eventModel.find({creator: userId});
}

function updateEvent(eventId, event) {
  return eventModel.update({_id: eventId},event);
}
function deleteEvent(eventId) {
  return eventModel.remove({_id: eventId});
}
function findAllEvents() {
  return eventModel.find(function (err, docs) {
  });
}
function queryAllEvents(query) {
  console.log(query);
  return eventModel.find({
    "$text": {
      "$search": query
    }
  }, function (err, docs) {
  });
}
