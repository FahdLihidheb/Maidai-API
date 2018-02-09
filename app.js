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
//--
const topicsRoutes = require('./api/routes/topics');
const userController = require('./api/routes/user');
const postsRoutes = require('./api/routes/posts');
//Auth
app.route('/signup').post(userController.signup);
app.route('/login').post(userController.login);
// Routes
app.use('/topics', topicsRoutes);
app.use('/posts', postsRoutes);


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