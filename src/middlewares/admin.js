function admin(req, res, next) {
	if (req.session.userLogged.rol==1) {
		next();
	}else{
		return res.redirect('/');
	}
}
module.exports = admin;