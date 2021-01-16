module.exports = {

	isLoggedIn(req,res,next){
		if(req.isAuthenticated()){ /* devuelve true si el user o esa sección del user existe */
			return next();
		} 
		return res.redirect('/signin');
	},

	isNotLoggedIn(req,res,next){
		if(!req.isAuthenticated()){
			return next();
		}else{
			return res.redirect('/profile');
		}
	}
};
