require('dotenv').config()

import express from 'express';
import monk from 'monk';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport'
import { Strategy as BnetStrategy } from 'passport-bnet'


import wow from './Routes/wow';
// import ffxiv from './Routes/ffxiv';

const app = express();
const port = process.env.PORT || 3005;
const db = monk('localhost:27017/botweb');
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Router
app.use('/api/wow', wow);
//app.use('/api/ffxiv', ffxiv);

//Passports
const BNET_ID = process.env.BNET_CLIENT_ID
const BNET_SECRET = process.env.BNET_CLIENT_SECRET

passport.use('US', new BnetStrategy({
  clientID: BNET_ID,
  clientSecret: BNET_SECRET,
  callbackUrl: `http://localhost:${port}/api/wow/callback`,
  region: "us"
}, function(accessToken, refreshToken, profile, done) {
  return done(null, profile)
}))

// Listener
app.listen(port, () => {
  console.log(`Starting API service at http://localhost:${port}`);
});
