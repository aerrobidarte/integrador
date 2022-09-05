const express=require('express');
const path=require('path');
const methodOverride=require('method-override');

const indexRouter=require('./routes/home');
const moviesRoutes=require('./routes/moviesRoutes');
const usersRoutes=require('./routes/usersRoute');
let logged = require("./middlewares/logged");
let session = require("express-session");
let cookieParser = require('cookie-parser');

const app=express();

// const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

// app.use(session({
// 	secret: "Shhh, It's a secret",
// 	resave: false,
// 	saveUninitialized: false,
// }));
// app.use(userLoggedMiddleware);

//settings views
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine','ejs');

app.use(
    session({
      secret: "234t234bse23rbIUNN@#^421mb_6276gb",
      resave: false,
      saveUninitialized: true,
    })
  );

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(cookieParser());
app.use(logged);
// app.use(logger('dev'));
app.use(express.json());
app.use(methodOverride('_method'));
// app.use(logged);

//
app.use(express.urlencoded({ extended: false }));

app.use('/',indexRouter);
app.use(moviesRoutes);
app.use(usersRoutes);

app.listen('3001', () => console.log('Servidor corriendo en el puerto 3001'));
