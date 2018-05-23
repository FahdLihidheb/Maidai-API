var multer = require('multer');
var cloudinary = require('cloudinary');
const doctorController = require('./doctorController');

cloudinary.config({
    cloud_name: 'drtg6wmwx',
    api_key: '453765917122873',
    api_secret: 'KTCkW22UOORtwSOezzfBNr-xFKk'
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, req.userData.userId + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});

var upload = multer({
    storage: storage
}).single('imagePath');


exports.uploadToLocal = (req, res) => {

    upload(req, res, function (err) {
        if (err) {
            res.status(500).json({ message: err });
            return;
        }
        cloudinary.uploader.upload(
            './uploads/' + req.file.filename,
            function (result) {
                if (result.error) {
                    res.status(500).json({ message: result.error });
                    return;
                }
                console.log(result);
                doctorController.updateImage(req.userData.userId, result.version + '/Doctors_images/' + req.file.filename, res);
            },
            {
                public_id: 'Doctors_images/' + req.userData.userId,
                crop: 'limit',
                width: 255,
                height: 255,
                eager: [
                    {
                        width: 255, height: 255, crop: 'thumb', gravity: 'face',
                        radius: 20, effect: 'sepia'
                    },
                    { width: 255, height: 255, crop: 'fit', format: 'png' }
                ]
            }
        );
    });
};
