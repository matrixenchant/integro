import bodyParser from 'body-parser';

import cors from 'cors';
import express from 'express';
import http from 'http';

import api from './api';
import * as db from './db';

import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// App
app.use(subdomain('int1', require('./client.router')));

// Api
app.use('/api', api);

server.listen(1010, async () => {
  try {
    console.log('server starting...');
    await db.connect();

    console.log('server started on port 8000');
  } catch (e) {
    console.log('server error: ', e);
  }
});
