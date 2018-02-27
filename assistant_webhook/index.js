var builder = require('botbuilder');
var apiairecognizer = require('api-ai-recognizer');

var connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD + "^"
});

var inMemoryStorage = new builder.MemoryBotStorage();

var bot = new builder.UniversalBot(connector).set('storage', inMemoryStorage);
var recognizer = new apiairecognizer(process.env.APIAI_TOKEN);
var intents = new builder.IntentDialog({ recognizers: [recognizer] });
const facebook = require('botbuilder-facebookextension');

bot.use(
    facebook.RetrieveUserProfile({
        accessToken: process.env.PAGE_ACCESS_TOKEN
    })
);

const intentcontroller = require('./intentController');


bot.dialog('/', intents);

intents.matches('Default Welcome Intent', intentcontroller.welcome);

intents.matches('Medical News', intentcontroller.medicalNews);

intents.matches('What is', intentcontroller.whatis);

intents.matches('Ask me', intentcontroller.askMe);


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