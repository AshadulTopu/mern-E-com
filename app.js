const {readdirSync} = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
// const config = require('./config');
require('dotenv').config();




// middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));

// routes middlewares
readdirSync('./routes').map((r) => app.use('/api/v1', require(`./routes/${r}`)));

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('DB connected'))
    .catch((err) => console.log(err));


module.exports = app;
