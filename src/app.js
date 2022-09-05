const express=require('express');
const path=require('path');
const methodOverride=require('method-override');

const indexRouter=require('./routes/home');
const moviesRoutes=require('./routes/moviesRoutes');
const usersRoutes=require('./routes/usersRoute');
// let logged = require("./middleware/logged");

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

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(methodOverride('_method'));
// app.use(logged);

//
app.use(express.urlencoded({ extended: false }));

app.use('/',indexRouter);
app.use(moviesRoutes);
app.use(usersRoutes);

app.listen('3001', () => console.log('Servidor corriendo en el puerto 3001'));
