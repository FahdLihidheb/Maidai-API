const FBprofile = require('../models/facebookProfile');

exports.saveProfile = (profile) => {
    const fbprofile = new FBprofile();
    fbprofile.userData = profile;
    fbprofile.user_fb_id = profile.user_fb_id;
    fbprofile.save()
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        });
};

exports.getProfile = (user_id) => {
    FBprofile.find({ user_fb_id: user_id})
    .exec()
    .then(profile => {
        return profile;
    })
    .catch(err => {
       return err;
    });
};