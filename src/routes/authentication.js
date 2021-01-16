const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn,isNotLoggedIn } = require('../lib/auth'); /* lo pongo en cualquier ruta que quiera proteger */

/* Ruta para renderizar el formulario */
 router.get('/signup', isNotLoggedIn, (req,res) => {
 res.render('auth/signup'); /* renderizando con views */
 
});

/* Ruta para recibir datos del formulario */
router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
   		successRedirect: '/profile', /* indica que redirecciona a profile */
		failureRedirect: '/signup',
		failureFlash: true

}));

router.get('/signin',isNotLoggedIn, (req,res) => {
  res.render('auth/signin');
});

router.post('/signin',isNotLoggedIn, (req,res,next) => {
	passport.authenticate('local.signin',{
 		successRedirect: '/profile',
		failureRedirect: '/signin',
		failureFlash: true,
	})(req,res,next);
});

/* aqui ponemos isLoggedIn para checar haya un usario conectado */
router.get('/profile', isLoggedIn, (req,res) => {
 res.render('profile');
});

router.get('/logout', isLoggedIn, (req,res) => {
    req.logOut();
    res.redirect('/signin');

});

module.exports = router;
