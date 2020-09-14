let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');
const apiControllers = require('./routes/controllers/ApiController');
let cors = require('cors')

let app = express();

app.use(express.static(path.join(__dirname, 'public')));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors({
    "origin": ['http://127.0.0.1:8789'],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders:['Content-Type', 'Authorization']
}));

app.use('/', express.static('public'));
// app.use('/users', usersRouter);
// app.all('/api/*',apiControllers)
app.use('/api', apiRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({status: 404, msg: '错误的接口'});
});

module.exports = app;
