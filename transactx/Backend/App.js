var express = require('express')
//require('dotenv').config({ path: '../.env' });
require('dotenv').config({ path: '.env' });
var app = express()


const getStats = require('./Api/tableops.js')
const getCustomer = require('./Api/customer.js')
const getCreditCard = require('./Api/creditcard.js')
const getClosedbyDate = require('./Api/byclosedate.js')

const cors = require('cors');
app.use(cors());


app.use('',getStats)
app.use('',getCustomer)
app.use('',getCreditCard)
app.use('',getClosedbyDate)


module.exports = app;

