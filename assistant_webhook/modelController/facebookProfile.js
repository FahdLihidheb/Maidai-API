const FBprofile = require('../models/facebookProfile');

exports.saveProfile = (profile) => {
    const fbprofile = new FBprofile();
    for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
        var field = fields_1[_i];
        if (profile[field] === undefined) {
            continue;
        }
        fbprofile.userData[field] = profile[field];
    }
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