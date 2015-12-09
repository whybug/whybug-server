export default () => {
    return {};
}

//var uuid = require('node-uuid');
//var EventStoreClient = require('event-store-client');
//
//export default class EventStore
//{
//  constructor(connection, credentials) {
//    this.connection = connection;
//    this.credentials = credentials;
//  }
//
//  subscribeToStream(onEvent) {
//    this.connection.subscribeToStream(onEvent);
//  }
//
//  writeEvent(event) {
//    this.connection.writeEvents(
//      event.type,
//      EventStoreClient.ExpectedVersion.Any,
//      false,
//      [this.mapEventToEventStore(event)],
//      this.credentials,
//      function(completed) {
//        if (!completed) {
//          console.log('Events written result: ' + EventStoreClient.OperationResult.getName(completed.result));
//        }
//      });
//  }
//
//  mapEventToEventStore(event) {
//    return {
//      eventId: event.eventId || uuid.v4(),
//      eventType: event.type,
//      data: event
//    };
//  }
//}

//var config = {
//  'eventStore': {
//    'address': "127.0.0.1",
//    'port': 1113,
//    'stream': '$stats-127.0.0.1:2113',
//    'credentials': {
//      'username': "admin",
//      'password': "changeit"
//    }
//  },
//  'debug': false
//};
//
//var options = {
//  host: config.eventStore.address,
//  port: config.eventStore.port,
//  debug: config.debug
//};
//
//var connection = new EventStoreClient.Connection(options);
//
//connection.sendPing(function(pkg) {
//  console.log('Received ' + EventStoreClient.Commands.getCommandName(pkg.command) + ' response!');
//});
//
//var destinationId = "TestStream";
//
//var newEvent = {
//  eventId: EventStoreClient.Connection.createGuid(),
//  eventType: 'TestEvent',
//  data: {
//    textProperty: "value",
//    numericProperty: 42
//  }
//};
//
//var streamId = config.eventStore.stream;
//var credentials = config.eventStore.credentials;
//var written = false;
//var read = false;
//var readMissing = false;
//var newEvents = [ newEvent ];
//connection.writeEvents(destinationId, EventStoreClient.ExpectedVersion.Any, false, newEvents, credentials, function(completed) {
//  console.log('Events written result: ' + EventStoreClient.OperationResult.getName(completed.result));
//  closeIfDone();
//});
//
//function closeIfDone() {
//  if (written && read && readMissing) {
//    console.log("All done!");
//    connection.close();
//  }
//}
//
//function subscribe(stream) {
//
//}
//
//function unsubscribe(stream) {
//
//}
