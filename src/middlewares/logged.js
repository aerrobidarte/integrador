const db = require('../database/models');

 async function logged(req, res, next) {
    res.locals.isLogged = false;
    let userLogged = false;
    if(req.cookies.user){
        userLogged = req.cookies.user;
    }
    else if(req.session.userLogged){
        userLogged = req.session.userLogged.email
    }
    
    try{
        if(userLogged){
            let user = await db.User.findOne({
                where:{
                    email: userLogged
                }
            });
             
            req.session.userLogged = user;
                
            if (req.session.userLogged) {
                res.locals.isLogged = true;
                res.locals.userLogged = req.session.userLogged.email;
                res.locals.userRol = req.session.userLogged.rol;
            }
        }
    }    
    catch(err){
        console.log("error logged: ", err);
        res.redirect('/login');
    }
    next();
}

module.exports = logged;