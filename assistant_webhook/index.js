var builder = require('botbuilder');
var apiairecognizer = require('api-ai-recognizer');
var connector = new builder.ChatConnector();
var bot = new builder.UniversalBot(connector);
var recognizer = new apiairecognizer(process.env.APIAI_TOKEN);
var intents = new builder.IntentDialog({ recognizers: [recognizer] });

const intentController = require('./intentController');

bot.dialog('/', intents);

intents.matches('Default Welcome Intent', intentController.welcome);

intents.matches('Medical News', intentController.medicalNews);

intents.matches('What is', intentController.whatis);

intents.matches('Ask me', intentController.askMe);


//Defualt intent
intents.onDefault((session, args) => {
  var fulfillment = builder.EntityRecognizer.findEntity(args.entities, 'fulfillment');
  if (fulfillment) {
    var speech = fulfillment.entity;
    session.send(speech);
  } else {
    session.send('Sorry...not sure how to respond to that');
  }
});

exports.connector = connector.listen();