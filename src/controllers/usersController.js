const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../database/models");

let usersController = {
    login: (req, res) => {
        return res.render("./login.ejs");
    },

    loginProcess: (req, res) => {
      db.User.findOne({
        where: {
          email: req.body.email,
        },
      }).then((user) => {
        if (user) {
          let isOkThePassword = bcryptjs.compareSync(req.body.password, user.password);
          if (isOkThePassword) {
            delete user.password;
            req.session.userLogged = user;
         
            if (req.body.recordarLogin == true) {
              res.cookie("user", req.body.email, { maxAge: 1000 * 60 * 60 }); 
            }
            res.redirect("/users/profile");
          } else {
            return res.render("./login.ejs", {
              errors: {
                email: {
                  msg: "Las credenciales son inválidas",
                },
              },
            });
          }
        } else {
          res
            .render("./login.ejs", {
              errors: {
                email: {
                  msg: "La combinación de usuario y contraseña son invalidos o inexistente",
                },
              },
            })
        }
      });
    },
    register: (req, res) => {
        res.render("./register.ejs");
    },
    
    registerWrite: (req, res) => {
        let errores = validationResult(req);
    
        if (errores.errors.length > 0) {
          res.render("./register.ejs", {
            errors: errores.mapped(),
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
      profile: (req, res) => {
        return res.render('profile', {
          user: req.session.userLogged
        });
      },
      logout: (req, res) => {
        res.clearCookie('user');
        req.session.destroy();
        return res.redirect('/');
      }
    
}
module.exports=usersController;