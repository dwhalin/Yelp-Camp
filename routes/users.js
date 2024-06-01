const express = require('express');
const router = express.Router();
const User = require('../models/user');
const users = require('../controllers/users');
const catchAsync = require('../utils/catchAsync');
const { storeReturnTo } = require('../middleware');
const passport = require('passport');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));


router.route('/login')
.get(users.renderLogin);

router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
    (req, res) => {
        req.flash('success', 'Welcome back!');
        const redirectUrl = res.locals.returnTo || '/campgrounds'; // update this line to use res.locals.returnTo now
        res.redirect(redirectUrl);
    });

router.get('/logout', users.logout);

module.exports = router;


