import express from 'express';
import monk from 'monk';
import bodyParser from 'body-parser';
import cors from 'cors';


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

// Listener
app.listen(port, () => {
  console.log(`Starting API service at http://localhost:${port}`);
});
