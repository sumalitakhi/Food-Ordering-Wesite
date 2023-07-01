const user = require('./userModel')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretKey = 'sumalineerja0209'
const login = (req, res) => {
    let validation = ''
    if (!req.body.email)
        validation += "email is required"
    if (!req.body.password)
        validation += 'password is required'
    if (!!validation)
        res.send({ success: false, status: 400, message: validation })
    else
        user.findOne({ email: req.body.email })
            .then(result => {
                if (result == null)
                    res.send({ success: false, status: 400, message: 'no user found' })
                else {
                    if (bcrypt.compareSync(req.body.password, result.password)) {
                        if (result.status) {
                            let payload = {
                                _id: result._id,
                                email: result.email,
                                userType: result.userType
                            }
                            let token = jwt.sign(payload, secretKey, { expiresIn: '5h' })
                            res.send({ success: true, status: 200, message: 'login successfull', data: result, token: token })
                        }
                        else {
                            res.send({ success: false, status: 500, message: 'Your account is block' })
                        }
                    }
                    else {
                        res.send({ success: false, status: 500, message: "Invalid credentials" })
                    }
                }
            })
            .catch(err => {
                res.send({ success: false, status: 500, message: 'no user found' })
            })
}

const changeStatus = (req, res) => {
    let validation = ''
    if (!req.body._id)
        validation += '_id is required'
    if (!req.body.status)
        validation += 'status is required'
    if (!!validation)
        res.send({ success: false, status: 500, message: validation })
    else {
        user.findOne({ _id: req.body._id })
            .then(result => {
                if (result == null)
                    res.send({ success: false, status: 500, message: 'No user find' })
                else {
                    if (!!req.body.status)
                        result.status = req.body.status
                    result.save()
                        .then(updatedResult => {
                            res.send({ success: true, status: 200, message: 'status updated', data: updatedResult })
                        }).catch(error => {
                            res.send({ success: false, status: 500, message: error.message })
                        })
                }
            }).catch(error => {
                res.send({ success: false, status: 500, message: error.message })
            })
    }
}


const changePassword = (req, res) => {
    let validation = ''
    if (!req.body._id)
        validation += '_id is required'
    if (!req.body.currentPassword)
        validation += ' Current Password is required'
    if (!req.body.newPassword)
        validation += ' new Password is required'
    if (!!validation)
        res.send({ success: false, status: 500, message: validation })
    else {
        user.findOne({ _id: req.body._id })
            .then(result => {
                if (result == null)
                    res.send({ success: false, status: 550, message: 'Admin does not exist' })
                else {
                    if (bcrypt.compareSync(req.body.currentPassword, result.password)) {
                        result.password = bcrypt.hashSync(req.body.newPassword,10)
                        // result.password=req.body.newPassword
                       
                        result.save()
                            .then(updatedPass => {
                                res.send({ success: true, status: 200, message: 'Password change', data: updatedPass })
                            })
                            .catch(error => {
                                res.send({ success: false, status: 555, message: error.message })
                            })
                    }
                    else {
                        res.send({ success: false, status: 500, message: "Current Password does not match" })
                    }
                }
            }).catch(error => {
                res.send({ success: false, status: 560, message: error.message })
            })
    }

}

module.exports = { login, changeStatus, changePassword } 