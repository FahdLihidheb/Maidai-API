const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//connct to mongodb atlas
mongoose.connect('mongodb://FahdLihidheb:'+
                process.env.MONGO_ATLAS_PW
                +'@clusterofthecrown-shard-00-00-p8mrc.mongodb.net:27017,clusterofthecrown-shard-00-01-p8mrc.mongodb.net:27017,clusterofthecrown-shard-00-02-p8mrc.mongodb.net:27017/test?ssl=true&replicaSet=ClusterOfTheCrown-shard-0&authSource=admin');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//-- website welcome

// Webhook ( Maidai assistant )
const assistantWebhook = require('./assistant_webhook/index');
app.use('/maidai-assistant', assistantWebhook)
//-- Backend ( Maidai news )
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Origin',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Conttol-Allow-Methods', 'PUT, PATCH, POST, GET, DELETE');
        return res.status(200).json({});
    }
    next();
});

//-- backend routes/controllers
const topicsRoutes = require('./backend_api/routes/topics');
const userController = require('./backend_api/controllers/user');
const postsRoutes = require('./backend_api/routes/posts');
//Auth
app.route('/maidai-news/signup').post(userController.signup);
app.route('/maidai-news/login').post(userController.login);
// Backend routes callbacks
app.use('/maidai-news/topics', topicsRoutes);
app.use('/maidai-news/posts', postsRoutes);


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error : {
            message: error.message
        }
    });
});

module.exports = app;