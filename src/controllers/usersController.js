const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../database/models");

let usersController = {
    login: (req, res) => {
        return res.render("./login.ejs");
      },
    register: (req, res) => {
        res.render("./register.ejs");
      },
      registerWrite: (req, res) => {
        let errores = validationResult(req);
    
        if (errores.errors.length > 0) {
          res.render("./register.ejs", {
            errores: errores.mapped(),
            oldData: req.body,
          });
        } else {
          let key = bcryptjs.hashSync(req.body.password, 5);
          let newUser = {
            name: req.body.name,
            email: req.body.email,
            password: key,
            remember_token: req.body.remember,
            rol: req.body.userType,
          };
    
          db.User.create(newUser)
            .then(() => {
              return res.redirect(`./login/`);
            })
            .catch((error) => res.send(error));
        }
      },
    
}
module.exports=usersController;