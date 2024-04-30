const express = require('express');
const router = express.Router();
const sequelize = require("../sequelize");
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/utilisationbycard', async (req, res) => {
    try {
        const json_body = JSON.stringify(req.body);
    
        // Execute the view
     const results = await sequelize.query('SELECT * FROM AverageCreditutilizedBycardtype');
     console.log("Results:", results)
    
        res.status(200).json({ message: 'Utilisation by card results returned successfully ' ,results:results});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    }
);

module.exports = router;
