import express from 'express';
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const cors = require('cors');
import bodyParser from "body-parser";
require('dotenv').config();
import { NextFunction, Request, Response } from 'express';

//import routes
const authRoutes = require('./routes/auth');
const { db } = require('./models/user');

const app = express();
const uri = process.env.DATABASE

 mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }).then((result: any) => {
  console.log('Mongo Connected');
}).catch((error: Error) => {
  console.log(`error occured: `+error);
});
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// middleware
app.use('', authRoutes);
const port = process.env.PORT || 3002 || 3003;
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
});

