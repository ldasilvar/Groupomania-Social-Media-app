const express = require('express');
const userRoute = require('./routes/user').router;
const articleRoute = require('./routes/article').router;
const commentRoute = require('./routes/comment').router;
const path = require('path');

const app = express();

// sécurité

const session = require('cookie-session');
const helmet = require('helmet');


app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }));
app.use(helmet.frameguard({ action: 'deny' }));

const expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour
app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  cookie: { secure: true,
            httpOnly: true,
            path: '/api/auth',
            expires: expiryDate
          }
  })
);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});



app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use((req, res, next) => {
    res.status(200);
    next();
})

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth/', userRoute);
app.use('/api/articles/', articleRoute, commentRoute);
app.use('/api/comments/', commentRoute);

module.exports = app;