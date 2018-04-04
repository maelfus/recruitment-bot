var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET Listings page. */
router.get('/list', function(req, res, next) {
  res.render('list', { title: 'Listings' });
});

module.exports = router;
