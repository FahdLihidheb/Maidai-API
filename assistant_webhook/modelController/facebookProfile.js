const FBprofile = require('../models/facebookProfile');

exports.saveProfile = (profile) => {
    const fbprofile = new FBprofile(profile);
    fbprofile.save()
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        });
};

exports.getProfile = (user_id) => {
    FBprofile.find({ user_id: user_id})
    .exec()
    .then(profile => {
        return profile;
    })
    .catch(err => {
       return err;
    });
};