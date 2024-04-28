const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser'); // Assuming you have a User model
const sequelize = require("../sequelize");
const router = express.Router();

router.use(bodyParser.json());
var crypto = require('crypto');

//function code taken from http://blog.tompawlak.org/how-to-generate-random-values-nodejs-javascript
function randomValueHex (len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len).toUpperCase();   // return required number of characters
}

// User login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Find user by username
    const json_body = JSON.stringify(req.body);

    // Execute the stored procedure with the JSON body as a parameter
    const results = await sequelize.query(
      "EXEC checkuser @json_body=:json_body",
      {
        replacements: {
          json_body: json_body,
        }, // Pass JSON body as replacement
        type: sequelize.QueryTypes.SELECT,
      }
    );
    // Generate JWT
    
    const secretKey = process.env.REACT_APP_JWT_SECRET
    //const sessionId = randomValueHex(4)+"-"+randomValueHex(4)+"-"+randomValueHex(4); 
    //console.log(sessionId)
    const token = jwt.sign({ username: username}, secretKey);
    res.json({token:token,results:results});
  } catch (error) {
    res.status(500).json({ lgin_pass: error.message });
  }
});

module.exports = router;


// Start server

