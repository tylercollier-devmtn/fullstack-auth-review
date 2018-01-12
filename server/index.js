const express = require('express');
const massive = require('massive');
const session = require('express-session');
const bodyParser = require('body-parser');
const axios = require('axios');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

massive(process.env.CONNECTION_STRING).then(db => {
  app.set('db', db);
}).catch(error => {
  console.log('error', error);
});

app.post('/login', (req, res) => {
  const { userId } = req.body;
  const auth0Url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${userId}`;
  axios.get(auth0Url, {
    headers: {
      Authorization: 'Bearer ' + process.env.AUTH0_MANAGEMENT_ACCESS_TOKEN
    }
  }).then(response => {
    const userData = response.data;
    req.session.user = {
      name: userData.name,
      email: userData.email,
      auth0_id: userData.user_id,
      pictureUrl: userData.picture
    };
    res.json({ user: req.session.user });
    app.get('db').find_user(userData.user_id).then(users => {
      if (!users.length) {
        app.get('db').create_user([userData.user_id, userData.email, userData.picture, userData.name]).then(() => {
          
        }).catch(error => {
          console.log('error', error);
        });
      }
    })
  }).catch(error => {
    console.log('error', error);
    res.status(500).json({ message: 'Oh noes!' });
  });
});

app.get('/user-data', (req, res) => {
  res.json({ user: req.session.user });
});

const PORT = process.env.SERVER_PORT || 3035;
app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});
