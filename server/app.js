require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const userRoute = require('./routes/userRoute');
const quoteRoute = require('./routes/quoteRoute');

app.use('/users', userRoute);
app.use('/quotes', quoteRoute);

mlabUsername = process.env.MLAB_USERNAME;
mlabPassword = process.env.MLAB_PASSWORD;

mongoose.connect(`mongodb://${mlabUsername}:${mlabPassword}@ds149672.mlab.com:49672/live-code-1`, { useNewUrlParser: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`Connected live-code-1 db!`);
});

app.listen(3000, () => {
  console.log('listening on port 3000!')
})