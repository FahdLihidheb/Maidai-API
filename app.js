const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const checkAuth = require('./backend_api/middleware/check-auth');


//connct to mongodb atlas
mongoose.connect('mongodb://FahdLihidheb:' +
    process.env.MONGO_ATLAS_PW +
    '@clusterofthecrown-shard-00-00-p8mrc.mongodb.net:27017,clusterofthecrown-shard-00-01-p8mrc.mongodb.net:27017,clusterofthecrown-shard-00-02-p8mrc.mongodb.net:27017/test?ssl=true&replicaSet=ClusterOfTheCrown-shard-0&authSource=admin');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Webhook ( Maidai assistant )
const assistantWebhook = require('./assistant_webhook/index');
app.route('/maidai-assistant').post(assistantWebhook.connector);
//-- Backend ( Maidai news )
app.use(cors());

//-- backend routes/controllers
const topicsRoutes = require('./backend_api/maidai_news/routes/topics');
const userController = require('./backend_api/maidai_news/controllers/user');
const postsRoutes = require('./backend_api/maidai_news/routes/posts');
// --
const MSAuthController = require('./backend_api/maidai_solution/controllers/authController');
const doctorRoutes = require('./backend_api/maidai_solution/routes/doctors');
const patientFileRoutes = require('./backend_api/maidai_solution/routes/PatientFile');
const appointmentRoutes = require('./backend_api/maidai_solution/routes/appointment');
//Auth
app.route('/maidai-news/signup').post(userController.signup);
app.route('/maidai-news/login').post(userController.login);
//check auth service JWT
app.route('/maidai/checkAuth').post(checkAuth, (req, res, next) => {
    res.status(201).json({
        message: 'Auth successful'
    });
});
// Backend routes callbacks
app.use('/maidai-news/topics', topicsRoutes);
app.use('/maidai-news/posts', postsRoutes);
//backend for Maidaisolution

const UploadFile = require('./backend_api/maidai_solution/controllers/uploadFile');

app.route('/api/upload').post(checkAuth, UploadFile.uploadToLocal);
app.route('/maidai-solution/register').post(MSAuthController.signup);
app.route('/maidai-solution/login').post(MSAuthController.login);
app.use('/maidai-solution/doctors', doctorRoutes);
app.use('/maidai-solution/patientFiles', patientFileRoutes);
app.use('/maidai-solution/appointments', appointmentRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;