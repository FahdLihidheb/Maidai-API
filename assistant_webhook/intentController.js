var builder = require('botbuilder');
const FBprofile = require('./modelController/facebookProfile');
//welcome intent
exports.welcome = (session) => {
    var profile = session.userData;
    profile.user_fb_id = session.message.address.user.id;
    FBprofile.saveProfile(profile);
    var msg = new builder.Message(session)
        .text("Welcome to Maidai " + session.userData.first_name + ", I am your assistant.\n\nMaidai is a platform dedicated for doctors to schedual appoinmnet with patients and analysing cells with the help of the AI.\n\nAs Maidai assistant, i am here to help your reach our doctors, make appoinment and provide you with the latest health news and informations.")
        .suggestedActions(
            builder.SuggestedActions.create(
                session, [
                    builder.CardAction.imBack(session, "Medical news", "Medical news"),
                    builder.CardAction.imBack(session, "Drug informations", "Drug informations"),
                    builder.CardAction.imBack(session, "Getting started", "Make an appoinment")
                ]
            ));
    session.send(msg);
};

//medical news intent
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

function findEntity(entities, type, sep) {
    return entities.filter(function (item, index) {
        return item.type == type;
    }).reduce(function (acc, curr) {
        return (acc += sep + curr.entity).trim();
    }, '');
}

exports.medicalNews = (session, args) => {
    var keyword = findEntity(args.entities, 'Disease_conditions', ' ');
    var text = "here are the latest headlines";
    var queryData = {
        category: 'health',
        country: 'us',
        language: 'en',
        pageSize: 5
    };

    if (keyword != "") {
        text = "Here are the latest news about " + keyword;
        queryData = {
            category: 'health',
            q: keyword,
            country: 'us',
            language: 'en',
            pageSize: 5
        };
    }

    newsapi.v2.topHeadlines(queryData).then(response => {
        var msg = new builder.Message(session);
        var newsArticls = [];
        if (response.totalResults == 0) {
            session.send("Sorry i can't find anything about " + keyword);
        } else {
            response.articles.forEach(element => {
                newsArticls.push(new builder.HeroCard(session)
                    .title(element.title)
                    .text(element.description)
                    .images([builder.CardImage.create(session, element.urlToImage)])
                    .buttons([
                        builder.CardAction.openUrl(session, element.url, 'More Information')
                    ]));
            });
            msg.attachmentLayout(builder.AttachmentLayout.carousel);
            msg.text(text);
            msg.attachments(newsArticls);
            session.send(msg);
        }

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
                    builder.CardAction.imBack(session, "medical news", "Medical news")
                ]
            ));
    session.send(msg);
};