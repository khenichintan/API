const mongoose = require('mongoose');

const singlepath = "/upload/singleimage"
const multimagepath = "/upload/multimage"

const multer = require('multer')

const path = require('path')

const cricketerSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    type: {
        type: Array,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    multimage: {
        type: Array,
        required: true
    },
    coach_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'coach',
        require: true,
    },
    role: {
        type: String,
        required: true
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        // cd(null, path.join(__dirname, '..', singlepath))
        if (file.fieldname == 'image') {
            cd(null, path.join(__dirname, '..', singlepath))
        } else {
            cd(null, path.join(__dirname, '..', multimagepath))
        }
    },
    filename: (req, file, cd) => {
        cd(null, file.fieldname + "-" + Date.now())
    }
});

cricketerSchema.statics.uploadAvatar = multer({ storage: storage }).fields([{ name: "image", maxCount: 1 }, { name: "multimage", maxCount: 5 }]);
cricketerSchema.statics.singlepath = singlepath;
cricketerSchema.statics.multimagepath = multimagepath;

const cricketer = mongoose.model('cricketer', cricketerSchema);

module.exports = cricketer;