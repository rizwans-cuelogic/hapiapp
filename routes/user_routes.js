const User = require('../models/user');
const boom = require('boom');
const Joi = require('joi');

module.exports.userRoutes = {
    name: 'user-routes',
    version: '1.0.0',
    register: async function (server, options) {

        // Create a route for example

        server.route({
            method: 'POST',
            path: '/api/users',
            handler: function (request, h) {
                let userName = request.payload.userName;
                let password = request.payload.password;
                let firstName = request.payload.firstName;
                let lastName = request.payload.lastName;
                console.log(userName, password, firstName, lastName);
                return User.findOne({
                        userName: userName
                    }).then((user) => {
                        if (user) {
                            console.log("heer user alred");
                            return {
                                error: "user already exist"
                            }
                        } else {
                            let ur = new User({
                                userName,
                                password,
                                firstName,
                                lastName
                            });
                            ur.save().then((user) => {
                                if (user) {
                                    console.log("heer user creat");
                                    return {
                                        user: user
                                    }
                                } else {
                                    console.log("user not creat...");
                                    return {
                                        error: "Erorr"
                                    }

                                }
                            })
                        }

                    })
                    .catch(err => console.log(err));

            },
            config: {
                validate: {
                    payload: {
                        userName: Joi.string().min(4).max(12).required(),
                        password: Joi.string().min(8).max(16).required(),
                        firstName: Joi.string(),
                        lastName: Joi.string()
                    }
                }
            }
        });
    }
};