const express = require("express");
//const { authenticateToken } = require('./authapi.js');
const router = express.Router();
const sequelize = require("../sequelize");
const bodyParser = require("body-parser");
router.use(bodyParser.json());

router.post("/userduedate", async (req, res) => {
  try {
    const json_body = JSON.stringify(req.body);

    // Execute the stored procedure with the JSON body as a parameter
    const results = await sequelize.query(
      "EXEC userduedateapproaching @json_body=:json_body",
      {
        replacements: {
          json_body: json_body,
        }, // Pass JSON body as replacement
        type: sequelize.QueryTypes.SELECT,
      }
    );
    
    console.log("results:",results)
    res
      .status(200)
      .json({ message: "user account stats retreived successfully successfully", results: results });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
