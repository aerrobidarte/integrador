const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../database/models");

let usersController = {
    login: (req, res) => {
        return res.render("./login.ejs");
      },
    
}
module.exports=usersController;