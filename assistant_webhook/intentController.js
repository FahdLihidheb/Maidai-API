var builder = require('botbuilder');

//welcome intent
exports.welcome = (session) => {
    session.send("Welcome to Maidai News "+session.userData.first_name+", I am your assistant");
};

//medical news intent
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

exports.medicalNews = (session, args) => {
    newsapi.v2.topHeadlines({
        category: 'health',
        country: 'fr',
        language: 'en'
    }).then(response => {
        var msg = new builder.Message(session);
        msg.attachmentLayout(builder.AttachmentLayout.carousel);
        msg.text("Here are the latest headlines");
        msg.attachments([
            new builder.HeroCard(session)
                .title("Coffee and cancer")
                .subtitle("Los angeles times")
                .text("Will coffee in california come with a cancer warning?")
                .images([builder.CardImage.create(session, 'http://www.latimes.com/resizer/uTj7f0beadjzDIocxsbnCy-Utks=/1400x0/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/IBCQ7GBSZNDDLBPBLZ7R75KAMI.jpg')])
                .buttons([
                    builder.CardAction.openUrl(session, 'http://www.latimes.com/opinion/op-ed/la-oe-nazaryan-acrylamide-20180218-story.html', 'More Information')
                ]),
            new builder.HeroCard(session)
                .title("Vaccine")
                .subtitle("Los angeles times")
                .text("In mice, a single vaccine prompts the immune system to fight breast, lung and skin cancers")
                .images([builder.CardImage.create(session, 'http://www.latimes.com/resizer/xbTmeZd6p8sAcRc52YQcFf_zu-s=/1400x0/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/BHVGDACK6NHE7ENVKWSB24ND7A.jpg')])
                .buttons([
                    builder.CardAction.openUrl(session, 'http://www.latimes.com/opinion/op-ed/la-oe-nazaryan-acrylamide-20180218-story.html', 'More Information')
                ])
        ]);
        session.send(msg);
        console.log(response);
    });
};

// 'what is' intent
exports.whatis = (session, args) => {
    var msg = new builder.Message(session);
    msg.attachmentLayout(builder.AttachmentLayout.carousel);
    msg.attachments([
        new builder.HeroCard(session)
            .title("Blood Cancer")
            .subtitle("American Society of hematology")
            .text("Blood cancers affect the production and function of your blood cells. Most of these cancers start in your bone marrow where blood is produced. Stem cells in your bone marrow mature and develop into three types of blood cells: red blood cells, white blood cells, or platelets.")
            .images([
                builder.CardImage.create(session, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Diagram_showing_cancer_cells_spreading_into_the_blood_stream_CRUK_448.svg/2000px-Diagram_showing_cancer_cells_spreading_into_the_blood_stream_CRUK_448.svg.png')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'http://www.hematology.org/Patients/Cancers/', 'More information')
            ])
    ]);
    session.send(msg);
};

//ask me intent
exports.askMe = (session) => {
    var msg = new builder.Message(session)
        .text("You can ask me something like")
        .suggestedActions(
            builder.SuggestedActions.create(
                session, [
                    builder.CardAction.imBack(session, "medical news", "Medical news"),
                    builder.CardAction.imBack(session, "what is blood cancer", "what is blood cancer")
                ]
            ));
    session.send(msg);
};