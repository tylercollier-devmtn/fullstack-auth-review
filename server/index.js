const express = require('express');
const massive = require('massive');
const session = require('express-session');
const bodyParser = require('body-parser');

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
  res.status(200).json({ user: { name: 'bob again' } });
});

const PORT = process.env.SERVER_PORT || 3035;
app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});
