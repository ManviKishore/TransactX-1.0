const express = require("express");
const router = express.Router();
const sequelize = require("../sequelize");
const bodyParser = require("body-parser");
router.use(bodyParser.json());

router.get("/customer", async (req, res) => {
  try {
    const json_body = JSON.stringify(req.body);

    // Execute the stored procedure with the JSON body as a parameter
    const results = await sequelize.query(
      "SELECT c.ssn,c.AccountNumber,c.username,firstname,Lastname,streetaddress,city,state,age,gender,monthly_income FROM customer c  inner join person p on c.ssn=p.ssn"
    );

    res
      .status(200)
      .json({
        message: "Customer results return successfully ",
        results: results,
      });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
