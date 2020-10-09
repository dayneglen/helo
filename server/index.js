require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env,
      postCtrl = require('./controllers/postController'),
      authCtrl = require('./controllers/authController');

const app = express();

app.use(express.json());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}));

//Initilizing Database
massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('db connected');
})

// Auth endpoints
app.post('/api/register', authCtrl.register);
app.post('/api/login', authCtrl.login);
app.get('/api/logout', authCtrl.logout);

//Posts endpoints
app.get('/api/posts/:id', postCtrl.getAllPosts);



app.listen(SERVER_PORT, console.log(`Server is running on port ${SERVER_PORT}`));

