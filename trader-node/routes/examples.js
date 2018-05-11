var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Stock Trader on z/OS',
    breadcrumb: 'Portfolio Statistics',
    mainPartial: 'partials/examples.ejs'
  });
});

module.exports = router;
