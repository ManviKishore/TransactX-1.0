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
const getUpdateUserProfile = require('./Api/updateuserprofile.js')
const getAccount = require('./Api/account.js')
const getUser = require('./Api/userapi.js')
const getAccountStats = require('./Api/useraccountstats.js')
const getUserduedate = require("./Api/userduedate.js")
const getUserExpenses = require("./Api/userexpenses.js")
const getUserLatePayments = require("./Api/userlatepayments.js")
const getUserTransactions = require("./Api/usertransactions.js")
const getMissedPaymentAccounts = require('./Api/missedpaymentsaccounts.js')

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
app.use('',getUpdateUserProfile)
app.use('',getAccount)
app.use('',getUser)
app.use('',getAccountStats)
app.use('',getUserduedate)
app.use('',getUserExpenses)
app.use('',getUserLatePayments)
app.use('',getUserTransactions)
app.use('',getMissedPaymentAccounts)

module.exports = app;

