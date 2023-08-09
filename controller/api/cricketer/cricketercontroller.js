const cricketer = require('../../../model/cricketermodel');
const jwt = require('jsonwebtoken');

module.exports.register = async(req, res) => {
    try {
        req.body.role = 'Cricketer'

        var singleimage = '';
        if (req.files.image) {
            singleimage = cricketer.singlepath + '/' + req.files.image[0].filename;
        }
        req.body.image = singleimage;

        var multiimage = [];
        if (req.files.multimage) {
            for (var i = 0; i < req.files.multimage.length; i++) {
                multiimage.push(cricketer.multimagepath + '/' + req.files.multimage[i].filename)
            }
        }
        req.body.multimage = multiimage;


        let data = await cricketer.findOne({ email: req.body.email })
        if (data) {
            return res.json({ status: 400, msg: "Email already use" })
        } else {
            let record = await cricketer.create(req.body)
            if (record) {
                return res.json({ status: 200, msg: "Cricketer add" })
            } else {
                return res.json({ status: 400, msg: "Data already add" })
            }
        }
    } catch (error) {
        console.log(error, "Cricketer");
    }
};

module.exports.cricketerlogin = async(req, res) => {
    try {
        let chackemail = await cricketer.findOne({ email: req.body.email });
        if (chackemail) {
            if (chackemail.password == req.body.password) {
                let token = jwt.sign({ data: chackemail }, "cricketer", { expiresIn: 85200 });
                return res.json({ status: 200, msg: token })
            } else {
                return res.json({ status: 400, msg: "inavalide data" })
            }
        } else {
            return res.json({ status: 400, msg: "data not avalible" })
        }
    } catch (error) {
        console.log(error, "cricketerlogin");
    }
};

module.exports.cricketerprofile = async(req, res) => {
    return res.json({ status: 200, msg: req.user })
};

module.exports.allcricketerdetail = async(req, res) => {
    try {

        let data = await cricketer.find({})
        return res.json(data)
    } catch (error) {
        console.log(error, "get cricketer detail");
    }
};

module.exports.cricketerupdate = async(req, res) => {
    try {
        let data = await cricketer.findById(req.params.id)
            // console.log(data);
        if (data) {
            let dataupdate = await cricketer.findByIdAndUpdate(data.id, req.body)
            if (dataupdate) {
                return res.json({ status: 200, msg: "data is update" })
            } else {
                return res.json({ status: 500, msg: "data not update" })
            }
        } else {
            return res.json({ status: 500, msg: "data is not update" })
        }
    } catch (error) {
        console.log(error, "cricketer data update");
    }
};

module.exports.changepassword = async(req, res) => {
    console.log(req.user);
    console.log(req.body);
    try {
        let data = await cricketer.findOne({ email: req.user.email });
        if (data) {
            if (req.user.password == req.body.cupass) {
                if (req.body.cupass != req.body.npass) {
                    if (req.body.npass == req.body.copass) {
                        let newpass = await cricketer.findByIdAndUpdate(req.user.id, { password: req.body.npass })
                        if (newpass) {
                            return res.json({ status: 200, msg: "password changed successfully" });
                        }
                    } else {
                        return res.json({ status: 200, msg: "password not match password" });
                    }
                } else {
                    return res.json({ status: 200, msg: "enter difanent  password" });
                }
            } else {
                return res.json({ status: 200, msg: "enter valid password" });
            }
        } else {
            return res.json({ status: 400, msg: 'login first !!!' });
        }
    } catch (error) {
        console.log(error, "change password");
    }
}