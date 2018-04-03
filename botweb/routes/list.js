var express = require('express');
var router = express.Router();

/* GET Listings page. */
router.get('/', function(req, res, next) {
  res.render('list', { title: 'Listings' });
});

module.exports = router;
