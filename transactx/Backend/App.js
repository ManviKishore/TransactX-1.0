var express = require('express')
//require('dotenv').config({ path: '../.env' });
require('dotenv').config({ path: '.env' });
var app = express()


const getStats = require('./Api/tableops.js')
const getCustomer = require('./Api/customer.js')
const getCreditCard = require('./Api/creditcard.js')
const getClosedbyDate = require('./Api/byclosedate.js')
const getState = require('./Api/bystate.js')
const getAvgMonthExpense = require('./Api/avgmonthexpense.js')
const getCustbyCard = require('./Api/bycardtype.js')
const getCustomerValue = require('./Api/customervalue.js')
const getLatePayments = require('./Api/latepayments.js')
const getUtilisationByCard = require('./Api/utilisationbycard.js')

const cors = require('cors');
app.use(cors());


app.use('',getStats)
app.use('',getCustomer)
app.use('',getCreditCard)
app.use('',getClosedbyDate)
app.use('',getState)
app.use('',getAvgMonthExpense)
app.use('',getCustbyCard)
app.use('',getCustomerValue)
app.use('',getLatePayments)
app.use('',getUtilisationByCard)


module.exports = app;

