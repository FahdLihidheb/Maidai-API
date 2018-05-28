
const analayseFile = require('../models/analyzeFile');

var Request = require("request");


const predictURL = "http://ec2-34-244-51-3.eu-west-1.compute.amazonaws.com:3000/predict";


exports.PredictImage = (url,name, res) => {
    console.log("gggg: "+url+" "+name)
    Request.post({
        "headers": { "content-type": "application/json" },
        "url": predictURL,
        "body": JSON.stringify({
            "url": url,
            "name": name
        })
    }, (error, response, body) => {
        if(error) {
            return res.status(500).json({
                err_code: 1,
                message: error
            })
        }
        return res.status(201).json({
            err_code: 0,
            message: "ok",
            diagnosis: JSON.parse(response.body),
            name: name
        })
    });
}

exports.addAnalyseFile = (req, res, next) => {
    const analyseFile = new analayseFile({
        codename: req.body.codename,
        createdBy: req.userData.userId,
        sampleCellImage: req.body.sampleCellImage,
        diagnosis: req.body.diagnosis,
        note: req.body.note,
    });
    analyseFile.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        });
};