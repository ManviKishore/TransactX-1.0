const express = require('express'); 
const router = express.Router();
const sequelize = require("../sequelize");
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/creditcard', async (req, res) => {
  try {
    
    const json_body = JSON.stringify(req.body);

    // Execute the stored procedure with the JSON body as a parameter
   const results = await sequelize.query('Select AccountNumber,CardType,Annual_Percentage_Rate,InterestLatePayment,id,Masked_cred_num from CreditCard');
   console.log("Results:", results)

  res.status(200).json({ message: 'Credit card results return successfully ' ,results:results});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;