// wiki.js - Wiki route module.

var express = require('express');
var router = express.Router();

// About page route.
router.get('/', function (req, res) {
    res.send('wiki');
})


module.exports = router;
