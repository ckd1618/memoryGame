var mongoose = require('mongoose');
var User = mongoose.model('User');
var Post = mongoose.model('Post');
var Books66iSaved = mongoose.model('Books66iSaved');
var UserNotesi = mongoose.model('UserNotesi');
var bcrypt = require('bcryptjs');
module.exports = {
    sendLoadout(req,res) {
        var newBooks66iSaved = new Books66iSavedSchema();


        res.json(req.body);

        // newBooks66iSaved.content = req.body
    },
    sendProjectData(req,res){
        
        UserNotesi.findOne({_id: '5e0564e490f3e0271097a13b'}, function (err, data) {
            data.content = req.body.userNotesi;
            data.save(function(err) {
                if (err){
                    console.log('err');
                    res.json(err);
                } else {
                    console.log('data', data);
                    console.log('data saved');
                    res.json(data);
                }
            })
        })



    },
    mongoUserNotesi(req,res) {
        UserNotesi.findById('5e0564e490f3e0271097a13b').exec((err, data) => {
            if (err) {
                res.json(err);
            }else {
                res.json(data);
            }
        });
    },
    // sendProjectData: function(req,res){
    //     console.log(req.session.userId);
    //     if (req.session.userId != undefined) {
    //         var newProject = new Project();
    //         console.log(req.body.project);
    //         newProject.project = req.body.project;
    //         newProject._author = req.session.userId;
    //         newProject.save(function(err) {
    //             if(err){
    //                 res.json(err);
    //             }else {
    //                 res.json(newProject);
    //             }
    //         })
    //     }else{
    //         res.json({error: 'You are not authorized!!!!'});
    //     }
    // },
    register: function(req,res){
        bcrypt.hash(req.body.password, 8, function(err, hash) {
            if(err){
                console.log('something went wrong', err);
                res.json(err);
            }else{
                // var hashedPw = hash;
                req.body.password = hash;
                var newUser = new User(req.body);
                newUser.save(function(err) {
                    if(err){
                        console.log('validation errors', err);
                        res.json(err);
                    }else{
                        console.log('registered a new user!');
                        req.session.userId = newUser._id;
                        res.json(newUser);
                    }
                })
            }
        })
    },
    login : function(req,res){
        // 1. Query the db for a user with the email that is entered in
        User.findOne({email: req.body.email}, function(err, foundUser){
            //
            if(foundUser){
                //compare the plaintext password witht he hashed password
                bcrypt.compare(req.body.password, foundUser.password, function(err, result){
                    if(err) {
                        console.log("passwords didn't match");
                        res.json({error: 'Invalid Login'});
                    }else{
                        console.log('passwords match');
                        console.log(result);
                        req.session.userId = foundUser._id;
                        res.json({message: "Logged in!"});
                    }
                })
            }
        })
    },
    get_current: function(req, res){
        if (req.session.userId != undefined) {
            User.findOne({_id: req.session.userId}, function(err, user) {
                if(err){
                    console.log('how???');
                    res.json(err);
                }else{
                    console.log('got current user');
                    res.json({email: user.email, _id: user._id});
                }
            })
        }else{
            res.json({error: 'You are not authorized!!!!'});
        }
    }
}