const express = require("express");
const router = express.Router();
const sequelize = require("../sequelize");
const bodyParser = require("body-parser");
router.use(bodyParser.json());

router.post("/usertransactions", async (req, res) => {
  try {
    const json_body = JSON.stringify(req.body);

    // Execute the stored procedure with the JSON body as a parameter
    const results = await sequelize.query(
      "EXEC usertransactions @json_body=:json_body",
      {
        replacements: {
          json_body: json_body,
        }, 
        type: sequelize.QueryTypes.SELECT,
      }
    );
    
    console.log("results:",results)
    res
      .status(200)
      .json({ message: "user transactions retreived successfully", results: results });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
