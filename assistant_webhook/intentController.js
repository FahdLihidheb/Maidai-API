var builder = require('botbuilder');
const FBprofile = require('./modelController/facebookProfile');
//welcome intent
exports.welcome = (session) => {
    var profile = session.userData;
    profile.user_fb_id = session.message.address.user.id;
    FBprofile.saveProfile(profile);
    var msg = new builder.Message(session)
        .text("Welcome to Maidai News " + session.userData.first_name + ", I am your assistant.\n\nyou can ask me somthing like")
        .suggestedActions(
            builder.SuggestedActions.create(
                session, [
                    builder.CardAction.imBack(session, "medical news", "Medical news")
                ]
            ));
    session.send(msg);
};

//medical news intent
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

exports.medicalNews = (session, args) => {
    newsapi.v2.topHeadlines({
        category: 'health',
        country: 'fr',
        language: 'en',
        pageSize: 5
    }).then(response => {
        var newsArticls = [];
        response.articles.forEach(element => {
            newsArticls.push(new builder.HeroCard(session)
                .title(element.title)
                .text(element.description)
                .images([builder.CardImage.create(session, element.urlToImage)])
                .buttons([
                    builder.CardAction.openUrl(session, element.url, 'More Information')
                ]));
        });
        var msg = new builder.Message(session);
        msg.attachmentLayout(builder.AttachmentLayout.carousel);
        msg.text("Here are the latest headlines");
        msg.attachments(newsArticls);
        session.send(msg);
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
                    builder.CardAction.imBack(session, "what is cold", "what is cold")
                ]
            ));
    session.send(msg);
};