const coach = require('../model/coachmodel');
const jwt = require('jsonwebtoken');

module.exports.register = async(req, res) => {
    try {
        req.body.role = 'Coach'
        let data = await coach.findOne({ email: req.body.email });
        if (data) {
            return res.json({ status: 400, msg: "email already use" })
        } else {
            let record = await coach.create(req.body)
            if (record) {
                return res.json({ status: record, msg: "Registration Successful" })
            } else {
                return res.json({ status: 400, msg: "Invalide Record" })
            }
        }
    } catch (error) {
        console.log(error, "register");
    }
};

module.exports.login = async(req, res) => {
    try {
        let chackemail = await coach.findOne({ email: req.body.email });
        if (chackemail) {
            if (chackemail.password == req.body.password) {
                let token = jwt.sign({ data: chackemail }, "Coach", { expiresIn: 85200 });
                return res.json({ status: 200, msg: token })
            } else {
                return res.json({ status: 400, msg: "Anvalide Password" })
            }
        } else {
            return res.json({ status: 400, msg: "invalide data" })
        }
    } catch (error) {
        console.log(error, "login");
    }
};

module.exports.profile = async(req, res) => {
    return res.json({ status: 200, "msg": req.user });
}

module.exports.changepassword = async(req, res) => {
    console.log(req.user);
    console.log(req.body);
    try {
        let data = await coach.findOne({ email: req.user.email });
        if (data) {
            if (req.user.password == req.body.cupass) {
                if (req.body.cupass != req.body.npass) {
                    if (req.body.npass == req.body.copass) {
                        let newpass = await coach.findByIdAndUpdate(req.user.id, { password: req.body.npass })
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