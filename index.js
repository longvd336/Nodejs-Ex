const express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');

var authMiddleware = require('./middle_ware/auth.middleware');

const port = 3000;

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());
app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/',(req,res) => {
    res.render('index', {
        name: 'Mr.A'
    });
});

app.use('/users',authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.listen(port, () => {
    console.log('success!!!');
});