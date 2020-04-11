const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors'); 
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/sign');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const port = process.env.PORT || 3000;
const db = knex({
    client: 'pg',
    connection: {
        host: 'postgresql-rigid-43468',
        user: 'postgres',
        password: 'test',
        database: 'smartbrain'
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors())


/**
 * ENDPOINT FOR ROOT
 */
app.get('/', (req, res) => {
    res.send('it is working');
});

/**
 * ENDPOINT FOR SIGN IN
 */
app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) });

/**
 * ENDPOINT FOR REGISTER
 */
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

/**
 * ENDPOINT FOR PROFILE
 */
app.get('/profile/:id', (req, res) => profile.handleProfileGet(req, res, db));

/**
 * ENDPOINT FOR USER ENTRIES
 */
app.put('/image', (req, res) => image.handleImage(req, res, db));

app.post('/imageurl', (req, res) => image.handleApiCall(req, res));

app.listen(port, () => {
    console.log(`app is running on port ${port}`)
});


