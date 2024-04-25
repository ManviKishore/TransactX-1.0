var express = require('express')
//require('dotenv').config({ path: '../.env' });
require('dotenv').config({ path: '.env' });
var app = express()


const getStats = require('./Api/tableops.js')

const cors = require('cors');
app.use(cors());


app.use('',getStats)




module.exports = app;

