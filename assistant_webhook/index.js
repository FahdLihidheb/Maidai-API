const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const express = require('express');
const router = express.Router();

// api.ai
router.post('/', (req, res, next) => {
    response = "This is a sample response from your webhook!";
    res.setHeader('Content-Type', 'application/json'); 
    res.json({
         "speech": response,
          "displayText": response
        });
});


module.exports = router;