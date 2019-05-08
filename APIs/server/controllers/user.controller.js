const Users = require('../models/user.model');
const userController = {};

userController.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    Users.findOne({
        email
    }).select('+password').exec()
        .then((user) => {
            if (user) {
                user.comparePassword(password, (err, isMatch) => {
                    if (isMatch && !err) {
                        res.send({
                            success: true,
                            message: 'User logged in successfully',
                            data: user
                        });
                    } else {
                        res.send({
                            success: false,
                            message: 'Incorrect password! Please try again with valid password.'
                        });
                    }
                });
            } else {
                res.send({
                    success: false,
                    message: 'No such user exists in system',
                    data: []
                });
            }
        })
        .catch((err) => {
            res.send({
                success: false,
                message: '**** Something went wrong while authenticating user ****',
                err_details: err
            });
        });
}

userController.create = (req, res) => {
    req.checkBody('firstName', 'Invalid/Empty first name').notEmpty();
    req.checkBody('lastName', 'Invalid/Empty last name').notEmpty();
    req.checkBody('email', 'Invalid/Empty email').notEmpty();
    const errors = req.validationErrors(true);
    if (errors) {
        return res.status(400).json({ 'Validation errors': errors });
    }
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    Users.findOne({
        email
    }).exec()
        .then((existingUser) => {
            if (existingUser) {
                return res.send({
                    success: false,
                    message: 'An user with this email already exists, Please try another email'
                });
            }
            const newUser = new Users({
                firstName,
                lastName,
                email,
                password
            });
            newUser.save()
                .then(() => {
                    res.send({
                        success: true,
                        message: `User is registered successfully`,
                        data: newUser
                    });
                })
                .catch((err) => {
                    res.send({
                        success: false,
                        message: '**** Something went wrong while registering new user ****',
                        errDetails: err
                    });
                });
        });
}

module.exports = userController;